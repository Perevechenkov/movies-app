import classes from './TaskItem.module.scss';

export default function TaskItem(props) {
  return <li className={classes.task}>{props.children}</li>;
}
