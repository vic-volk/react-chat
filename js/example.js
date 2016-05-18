var ChatBox = React.createClass({
    render: function() {
        return (
            <div className="chatBox">
                <h2>Chat box</h2>
                <ChatTextBox chatModel={this.props.chatModel} chatList={this.props.chatList} serverMessages={serverMessages}/>
            </div>
        );
    }
});

var MessageList = React.createClass({
    render: function() {
        var messagesNodes = this.props.data.map(function (message) {
            console.log(message);
            return (
                <Message author={message.author} key={message.id} date={message.date}>
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
        <div className="row">
            <span className={(this.props.className || '') + ' label label-default'}>{this.props.author}</span>
            <span className={(this.props.className || '') + ' label label-success'}>{this.props.date}</span>
            <div className="message">
                {this.props.children}
            </div>
        </div>
    );
  }
});

var ChatTextBox = React.createClass({
    getInitialState: function() {
      console.log('init-state');
      return {value: this.props.chatModel.text, index: 1, serverMessageIndex: 1};
    },
    handleChange: function(event) {
      this.setState({value: event.target.value});
      console.log('change-event');
    },
    handleKeyPress: function(event) {
      if (event.charCode == 13) {
          this.setState({value: event.target.value, index: this.state.index + 1});
          this.props.chatModel.text = event.target.value;
          var message = { id: this.state.index, author: "you", text: this.props.chatModel.text, date: new Date() + ""};
          this.props.chatList.push(message);
          console.log('key-press');
          console.log('event.target.value: ' + event.target.value);
          console.log('chat-list:' + this.props.chatList)
          this.forceUpdate();
      }
    },
    componentDidMount: function() {
        setInterval(this.requestAnswers, 10000); // Call a method on the mixin
    },
    requestAnswers: function() {
        this.state.index = this.state.index + 1;
        var index = this.state.index % 5 - 1;
        this.props.chatList.push({ id: this.state.index, author: "agent", text: this.props.serverMessages[index], date: new Date() + ""});
    },
    render: function() {
        return (
            <div className="chatTextBox">
                <div className={(this.props.className || '') + 'row' style='overflow: scroll'}>
                    <MessageList data={this.props.chatList}/>
                </div>
                <input 
                    type="textarea" 
                    placeholder="chat with cognitive agent."
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                /><br/>
            </div>
        );
    }
});

var chatModel = {
    text: ""
};

var chatList = [];
var serverMessages = ["Hi!", "Hello!", "Just a moment.", "Please, ask me smth.", "Yes, we have some books in this theme."];

setInterval(function() {
    ReactDOM.render(
        <ChatBox chatModel={chatModel} chatList={chatList} serverMessages={serverMessages}/>,
    document.getElementById('chat-box')
);}, 100);