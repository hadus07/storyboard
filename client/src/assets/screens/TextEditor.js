import React from 'react';
import {Redirect} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class TextEditor extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loggedIn: localStorage.getItem('loggedIn') || 'no',
            redirect: 'no',

            editorHtml: '',
            fullname: '',
            username: '',
            category: '',
            storyname: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.setState({
            loggedIn: localStorage.getItem('loggedIn'),
            fullname: localStorage.getItem('fullname'),
            username: localStorage.getItem('username')
        });
    }

    handleSubmit() {
        
        if(this.state.storyname === '') {
            alert('Story name cannot be blank!');
        }else if(this.state.editorHtml === '') {
            alert('Cannot submit an empty document!');
        }else if(this.state.category === '') {
            alert('Please select a category');
        }else {

            alert('Story has been submitted successfuly!');

            const data = {
                storyname: this.state.storyname,
                content: this.state.editorHtml,
                username: this.state.username,
                category: this.state.category
            }

            fetch('/editor', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(res => {
                
            })
            .catch(err => console.log(err));

            this.setState({redirect: 'yes'});
        }
    }

    handleChange (html) {
        this.setState({ editorHtml: html });
    }

    render() {
        return (() => {
            
            if(this.state.redirect === 'no') {
                if(this.state.loggedIn === 'yes') {
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
                            <form onSubmit={(event) => {event.preventDefault();}}>
                                <div  className="userinfo">
                                    <h4>{this.state.fullname}</h4>
                                    <h5>{this.state.username}</h5>
                                </div>
                                <select 
                                    className="inputBox" 
                                    value={this.state.category}
                                    onChange={e => {
                                        this.setState({category: e.target.value});
                                    }}
                                >
                                    
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
    
                                <input 
                                    type="text" 
                                    name="storyname" 
                                    className="story-name inputBox" 
                                    placeholder="Story name..." 
                                    value={this.state.storyname}
                                    onChange={ event => this.setState({ storyname: event.target.value }) }
                                />
    
                                <input 
                                    type="button" 
                                    value="Submit" 
                                    className="button" 
                                    onClick={this.handleSubmit}
                                />
                            </form>
                        </div>
                    );
                }else if (this.state.loggedIn === 'no') {
                    return (
                        <div
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'black',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'white'
                            }}
                        ><h1>You must be logged in to use this feature!</h1></div>
                    );
                }
            }else if(this.state.redirect === 'yes') {
                return <Redirect to="/" />;
            }

        })();
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