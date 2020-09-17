import React, { Component } from "react";
import "./App.css";
import Statics from "./Components/Statistics";
import FeedbackOptions from "./Components/FeedbackOptions";
import Section from "./Components/Section";
import Notification from "./Components/Notification";
class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleClick = (e) => {
    e.preventDefault();
    const { name } = e.target;
    this.setState({ [name]: this.state[name] + 1 });
  };
  countTotalFeedback() {
    const total = Object.values(this.state).reduce((acum, number) => {
      return acum + number;
    }, 0);

    return total;
  }

  countPositiveFeedbackPercentage() {
    const { good } = this.state;
    const positiveFeedback = ((good / this.countTotalFeedback()) * 100).toFixed(
      0
    );
    return positiveFeedback;
  }
  feedBackOptions = [
    { id: 1, name: "good" },
    { id: 2, name: "neutral" },
    { id: 3, name: "bad" },
  ];

  render() {
    return (
      <div>
        <Section title={"Please leave feedback"}>
          <FeedbackOptions
            options={this.feedBackOptions}
            onLeaveFeedback={this.handleClick}
          />
        </Section>
        <Section title={"Statistics"}>
          {this.countTotalFeedback() > 0 ? (
            <Statics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positiveFeedback={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </div>
    );
  }
}

export default App;
