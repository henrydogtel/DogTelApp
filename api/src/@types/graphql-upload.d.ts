declare module 'graphql-upload' {
    import { RequestHandler } from 'express';

    export function graphqlUploadExpress(options?: { maxFileSize?: number; maxFiles?: number }): RequestHandler;
    export default graphqlUploadExpress;
}
