import Section from '../UI/Section';
import TaskItem from './TaskItem';

import classes from './Tasks.module.scss';

export default function Tasks(props) {
  let content = <h2>No tasks found. Start adding some!</h2>;

  if (props.items.length > 0) {
    content = (
      <ul>
        {props.items.map(task => (
          <TaskItem key={task.id}>{task.text}</TaskItem>
        ))}
      </ul>
    );
  }

  if (props.error) {
    content = <button onClick={props.onFetch}>Try again</button>;
  }

  if (props.loading) {
    content = 'Loading tasks...';
  }

  return (
    <Section>
      <div className={classes.container}>{content}</div>
    </Section>
  );
}
