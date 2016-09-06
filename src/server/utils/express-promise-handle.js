export const wrapAsync = handler => {
  return (...args) => {
    handler(...args).catch(args[2])
  }
}
