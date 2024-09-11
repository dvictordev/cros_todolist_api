export class TaskNotExistsError extends Error {
  constructor() {
    super("Task does not exist!");
  }
}
