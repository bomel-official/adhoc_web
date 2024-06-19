import { Request } from "express";
import path from "path";
import { v4 as uuidv4 } from "uuid";

type File = Exclude<Request["files"], null | undefined>[string] | null | undefined;

export async function uploadFile( file: File ) {
    if ( file && !Array.isArray( file ) ) {
        const filename = uuidv4() + ".xlsx";
        const allowedFiletypes = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ];
        if ( !allowedFiletypes.find( type => type === file.mimetype ) ) {
            throw new Error(
                "Недопустимый формат изображения, загружайте XLSX файлы" );
        }

        const uploadPath = path.join( __dirname, "..", "..", "..", "static", filename );

        return await new Promise<string | null>( ( resolve, reject ) => {
            file.mv( uploadPath, function ( err ) {
                if ( err ) {
                    console.log(err);
                    return resolve( null );
                }
                return resolve( filename );
            } );
        } );
    }
}
