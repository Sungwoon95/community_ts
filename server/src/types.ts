import { Request, Response } from "express";

export enum Method {
  GET = 'get',
  PUT = 'put',
  DELETE = 'delete',
  POST = 'post'
}

export interface CustomRoute {
  method: Method
  route: string
  handler: (req: Request, res: Response) => void
}