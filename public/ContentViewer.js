import { Component } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

export default class ContentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(
        convertFromRaw(this.props.lesson.content)
      ),
      showToolbar: false,
      windowWidth: 0,
      toolbarMeasures: {
        w: 0,
        h: 0,
      },
      selectionMeasures: {
        w: 0,
        h: 0,
      },
      selectionCoordinates: {
        x: 0,
        y: 0,
      },
      toolbarCoordinates: {
        x: 0,
        y: 0,
      },
      showRawData: false,
    };

    this.focus = () => this.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });
  }

  onClickEditor = () => {
    this.focus();
    this.checkSelectedText();
  };

  // 1- Check if some text is selected
  checkSelectedText = () => {
    if (typeof window !== "undefined") {
      const text = window.getSelection().toString();
      if (text !== "") {
        // 1-a Define the selection coordinates
        this.setSelectionXY();
      } else {
        // Hide the toolbar if nothing is selected
        this.setState({
          showToolbar: false,
        });
      }
    }
  };

  // 2- Identify the selection coordinates
  setSelectionXY = () => {
    var r = window.getSelection().getRangeAt(0).getBoundingClientRect();
    var relative = document.body.parentNode.getBoundingClientRect();
    // 2-a Set the selection coordinates in the state
    this.setState(
      {
        selectionCoordinates: r,
        windowWidth: relative.width,
        selectionMeasures: {
          w: r.width,
          h: r.height,
        },
      },
      () => this.showToolbar()
    );
  };

  // 3- Show the toolbar
  showToolbar = () => {
    this.setState(
      {
        showToolbar: true,
      },
      () => this.measureToolbar()
    );
  };

  // 4- The toolbar was hidden until now
  measureToolbar = () => {
    // 4-a Define the toolbar width and height, as it is now visible
    this.setState(
      {
        toolbarMeasures: {
          w: this.elemWidth,
          h: this.elemHeight,
        },
      },
      () => this.setToolbarXY()
    );
  };

  // 5- Now that we have all measures, define toolbar coordinates
  setToolbarXY = () => {
    let coordinates = {};

    const {
      selectionMeasures,
      selectionCoordinates,
      toolbarMeasures,
      windowWidth,
    } = this.state;

    const hiddenTop = selectionCoordinates.y < toolbarMeasures.h;
    const hiddenRight =
      windowWidth - selectionCoordinates.x < toolbarMeasures.w / 2;
    const hiddenLeft = selectionCoordinates.x < toolbarMeasures.w / 2;

    const normalX =
      selectionCoordinates.x - toolbarMeasures.w / 2 + selectionMeasures.w / 2;
    const normalY = selectionCoordinates.y - toolbarMeasures.h;

    const invertedY = selectionCoordinates.y + selectionMeasures.h;
    const moveXToLeft = windowWidth - toolbarMeasures.w;
    const moveXToRight = 0;

    coordinates = {
      x: normalX,
      y: normalY,
    };

    if (hiddenTop) {
      coordinates.y = invertedY;
    }

    if (hiddenRight) {
      coordinates.x = moveXToLeft;
    }

    if (hiddenLeft) {
      coordinates.x = moveXToRight;
    }

    this.setState({
      toolbarCoordinates: coordinates,
    });
  };

  handleKeyCommand = (command) => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  toggleToolbar = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };

  render() {
    if (!this.props.lesson.content)
      return (
        <>
          <h1>No Content</h1>
        </>
      );
    console.log("I am re-rendered");
    console.log(this.props.lesson.content);
    console.log(this.state.editorState);
    const { editorState } = this.state;
    // Make sure we're not on the ssr
    if (typeof window !== "undefined") {
      // Let's stick the toolbar to the selection
      // when the window is resized
      window.addEventListener("resize", this.checkSelectedText);
    }

    const toolbarStyle = {
      display: this.state.showToolbar ? "block" : "none",
      backgroundColor: "black",
      color: "white",
      position: "absolute",
      left: this.state.toolbarCoordinates.x,
      top: this.state.toolbarCoordinates.y,
      zIndex: 999,
      padding: 10,
    };
    return (
      <div>
        <div
          ref={(elem) => {
            this.elemWidth = elem ? elem.clientWidth : 0;
            this.elemHeight = elem ? elem.clientHeight : 0;
          }}
          style={toolbarStyle}
        >
          <ToolBar editorState={editorState} onToggle={this.toggleToolbar} />
        </div>
        <div onClick={this.onClickEditor} onBlur={this.checkSelectedText}>
          <Editor
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder="Tell a story..."
            editorKey="foobar"
            spellCheck={false}
            ref={(element) => {
              this.editor = element;
            }}
          />
        </div>
        <div style={{ marginTop: 40 }}>
          <button
            onClick={() =>
              this.setState({ showRawData: !this.state.showRawData })
            }
          >
            {!this.state.showRawData ? "Show" : "Hide"} Raw Data
          </button>
          <br />
          {this.state.showRawData &&
            JSON.stringify(convertToRaw(editorState.getCurrentContent()))}
        </div>
      </div>
    );
  }
}

// Custom overrides for each style
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 4,
  },
  BOLD: {
    color: "#395296",
    fontWeight: "bold",
  },
  ANYCUSTOMSTYLE: {
    color: "#00e400",
  },
};

class ToolbarButton extends Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    const buttonStyle = {
      padding: 10,
    };
    return (
      <span onMouseDown={this.onToggle} style={buttonStyle}>
        {this.props.label}
      </span>
    );
  }
}

var toolbarItems = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Code", style: "CODE" },
  { label: "Surprise", style: "ANYCUSTOMSTYLE" },
];

const ToolBar = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div>
      {toolbarItems.map((toolbarItem) => (
        <ToolbarButton
          key={toolbarItem.label}
          active={currentStyle.has(toolbarItem.style)}
          label={toolbarItem.label}
          onToggle={props.onToggle}
          style={toolbarItem.style}
        />
      ))}
    </div>
  );
};
