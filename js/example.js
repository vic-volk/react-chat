var ChatBox = React.createClass({
    render: function() {
        return (
            <div className="chatBox">
                <h2>Chat box</h2>
                <ChatTextBox chatModel={this.props.chatModel}/>
            </div>
        );
    }
});

var ChatTextBox = React.createClass({
    //TODO:
    getInitialState: function() {
      return {value: 'Hello!'};
    },
    handleChange: function(event) {
      this.setState({value: event.target.value});
    },
    render: function() {
        return (
            <div className="chatTextBox">
                <label>{this.props.chatModel.text}</label>
                <input 
                    type="text" 
                    placeholder="TEXT"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
});

var chatModel = {
    text: "text-124"
};

ReactDOM.render(
  <ChatBox chatModel={chatModel}/>,
  document.getElementById('chat-box')
);