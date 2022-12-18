/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, ContentState, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './texteditor.css';
import { useEffect } from "react";

const TextEditor = ({ value, setFieldValue, disabled, resetData }) => {
  const prepareDraft = (value) => {
    const draft = htmlToDraft(value);
    const contentState = ContentState.createFromBlockArray(draft.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  const [editorState, setEditorState] = useState(
    value ? prepareDraft(value) : EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    const forFormik = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    setFieldValue(forFormik);
    setEditorState(editorState);
  };

  const onReset = () => {
    const editorStates = EditorState.push(editorState, ContentState.createFromText(''));
    setEditorState(editorStates);
  }
  
  useEffect(() => {
    if (resetData) {
      onReset();
    }
  }, [resetData])
  
  return (
    <div>
      <Editor
        
        readOnly={disabled}
        toolbar={{
        options: ["inline", "list"],
        list: {
        options: ["unordered", "ordered"],
        },
        }}
        editorState={editorState}
        toolbarClassName={`toolbarClassName ${disabled && 'bg-gray-100'}`}
        wrapperClassName={`custom-wrapper ${disabled && 'bg-gray-100'}`}
        editorClassName={`custom-editor ${disabled && 'bg-gray-100'}`}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default TextEditor;