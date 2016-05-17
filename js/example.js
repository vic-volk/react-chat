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
    getInitialState: function() {
      return {value: this.props.chatModel.text};
      console.log('init-state');
    },
    handleChange: function(event) {
      this.setState({value: event.target.value});
      console.log('change-event');
    },
    handleKeyPress: function(event) {
      if (event.charCode == 13) {
          this.setState({value: event.target.value});
          this.props.chatModel.text = event.target.value;
          console.log('key-press');
          console.log('event.target.value: ' + event.target.value);
      }
    },
    render: function() {
        return (
            <div className="chatTextBox">
                <input 
                    type="textarea" 
                    placeholder="chat with cognitive agent."
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                /><br/>
                <label>{this.props.chatModel.text}</label>
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