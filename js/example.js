var ChatBox = React.createClass({
    render: function() {
        return (
            <div className="chatBox">
                <h2>Chat box</h2>
                <ChatTextBox chatModel={this.props.chatModel} chatList={this.props.chatList}/>
            </div>
        );
    }
});

var MessageList = React.createClass({
    render: function() {
        var messagesNodes = this.props.data.map(function (message) {
            console.log(message);
            return (
                <Message author={message.author} key={message.id}>
                    {message.text}
                </Message>
            );
        });
        console.log(messagesNodes);
        return (
            <div class="messageList">
                {messagesNodes}
            </div>
        );
    }
});

var Message = React.createClass({
  render: function() {
    return (
      <div className="message">
        <h2 className="messageAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

var ChatTextBox = React.createClass({
    getInitialState: function() {
      console.log('init-state');
      return {value: this.props.chatModel.text, index: this.props.chatList[0].id + 1};
    },
    handleChange: function(event) {
      this.setState({value: event.target.value});
      console.log('change-event');
    },
    handleKeyPress: function(event) {
      if (event.charCode == 13) {
          this.setState({value: event.target.value, index: this.state.index + 1});
          this.props.chatModel.text = event.target.value;
          var message = { id: this.state.index, author: "test", text: this.props.chatModel.text};
          this.props.chatList.push(message);
          console.log('key-press');
          console.log('event.target.value: ' + event.target.value);
          console.log('chat-list:' + this.props.chatList)
          this.forceUpdate();
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
                <MessageList data={this.props.chatList}/>
            </div>
        );
    }
});

var chatModel = {
    text: "text-124"
};

var chatList = [
    { id: "1", author: "test", text: "test-text" }
]

ReactDOM.render(
  <ChatBox chatModel={chatModel} chatList={chatList}/>,
  document.getElementById('chat-box')
);