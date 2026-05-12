export class ResourceExistsException extends Error {
  constructor(resource: string) {
    super(`${resource} already exists`);
    this.name = "ResourceExistsException";
  }
}
