import { ProjectRepository } from "@core";
import { NextFunction, Request, Response } from "express";

export async function getManyProjectAll( req: Request, res: Response, next: NextFunction ) {
    const projects = await ProjectRepository.findAll( { where: {} } );
    return res.json( { data: projects } );
}
