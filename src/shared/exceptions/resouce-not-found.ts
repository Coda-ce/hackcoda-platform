export class ResourceNotFoundException extends Error {
  constructor(resource: string) {
    super(`${resource} not found`);
    this.name = "ResourceNotFoundException";
  }
}
