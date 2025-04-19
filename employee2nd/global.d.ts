declare global {
    var _mongoClientPromise: Promise<any>;
  }
  
  export {}; // This ensures the file is treated as a module
  