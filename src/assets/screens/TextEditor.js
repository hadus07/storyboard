import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class TextEditor extends React.Component {
    constructor (props) {
        super(props)
        this.state = { editorHtml: '', theme: 'snow' }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (html) {
        this.setState({ editorHtml: html });
    }

    render() {
        return (
            <div id="editor">
                <ReactQuill 
                    theme={this.state.theme}
                    onChange={this.handleChange}
                    value={this.state.editorHtml}
                    modules={TextEditor.modules}
                    formats={TextEditor.formats}
                    bounds={'.quill'}
                    placeholder='Write your story here...'
                />
                <form action="">
                    <div  className="userinfo">
                        <h3>User Name</h3>
                        <p>username</p>
                    </div>
                    <select name="" className="inputBox">
                        
                        <option value="science" >Science fiction</option>
                        <option value="satire" >Satire</option>
                        <option value="drama" >Drama</option>
                        <option value="action" >Action and Adventure</option>
                        <option value="romance" >Romance</option>
                        <option value="mystery" >Mystery</option>
                        <option value="horror" >Horror</option>
                        <option value="self" >Self help</option>
                        <option value="health" >Health</option>
                        <option value="guide" >Guide</option>
                        <option value="travel" >Travel</option>
                        <option value="children" >Children's</option>
                        <option value="religion" >Religion, Spirituality & New Age</option>
                        <option value="science" >Science</option>
                        <option value="history" >History</option>
                        <option value="math" >Math</option>
                        <option value="anthology" >Anthology</option>
                        <option value="poetry" >Poetry</option>
                        <option value="encyclopedias" >Encyclopedias</option>
                        <option value="dictionaries" >Dictionaries</option>
                        <option value="comics" >Comics</option>
                        <option value="art" >Art</option>
                        <option value="cookbooks" >Cookbooks</option>
                        <option value="diaries" >Diaries</option>
                        <option value="journals" >Journals</option>
                        <option value="prayer" >Prayer books</option>
                        <option value="series" >Series</option>
                        <option value="trilogy" >Trilogy</option>
                        <option value="biographies" >Biographies</option>
                        <option value="autobiographies" >Autobiographies</option>
                        <option value="fantasy" >Fantasy</option>

                    </select>
                    <input type="text" name="story-name" className="story-name inputBox" placeholder="Story name..." />
                    <input type="button" value="Submit" className="button"/>
                </form>
            </div>
        );
    }
}

TextEditor.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
}

TextEditor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

export default TextEditor;