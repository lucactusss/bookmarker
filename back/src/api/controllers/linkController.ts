import express, { Request, Response, NextFunction } from 'express';
import { ValidatorResult } from 'jsonschema';
import HttpException from '../../infra/errors/HttpException';
import { IController } from '../../models/api/IController';
import { formatMissingFields } from '../../utils/error.utils';
import { validateCreateLink, validateGetLinkList } from '../validators';
import LinkService from '../../business/link/linkService';
import {
  CreateLinkDTO,
  GetLinkListOptions,
} from '../../business/link/link.models';
import { StatusCodes } from 'http-status-codes';
import { Link } from '../../models/Link';

class LinkController implements IController {
  public path = '/links';

  public router: express.Router = express.Router();
  public linkService = new LinkService();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.post(this.path, this.createLink);
    this.router.delete(`${this.path}/:linkId`, this.deleteLink);
    this.router.post(`${this.path}/data`, this.getLinkList);
  }

  /**
   * @apiVersion 0.0.1
   * @api {post} /links CreateLink
   * @apiName CreateLink
   * @apiGroup Link
   *
   * @apiParam {String} url URL of the link
   * @apiParam {String} linkType Type of link (calculated by front end)
   *
   * @apiDescription Endpoint for creating a new link
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "url": "URL",
   *        "author": "author Name",
   *        ...
   *     }
   */
  createLink = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validationResult: ValidatorResult = validateCreateLink(req.body);
      if (!validationResult.valid) {
        throw new HttpException(
          StatusCodes.BAD_REQUEST,
          'Fields missing : ' + formatMissingFields(validationResult.errors)
        );
      }

      const result = await this.linkService.createLink(
        req.context,
        new CreateLinkDTO(req.body.url, req.body.linkType)
      );

      res.status(StatusCodes.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @apiVersion 0.0.1
   * @api {delete} /links/:linkId DeleteLink
   * @apiName DeleteLink
   * @apiGroup Link
   *
   * @apiDescription Endpoint for deleting an existing link
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   */
  deleteLink = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.params.linkId) {
        throw new HttpException(400, 'No linkId found in the request!');
      }

      await this.linkService.deleteLink(req.context, req.params.linkId);

      res.status(StatusCodes.OK).send();
    } catch (error) {
      next(error);
    }
  };

  /**
   * @apiVersion 0.0.1
   * @api {post} /links/data GetLinkList
   * @apiName GetLinkList
   * @apiGroup Link
   *
   * @apiParam {number} pageSize Size of data to return
   * @apiParam {number} pageNumber get data of x page - calculate offset with pageNumber * pageSize
   *
   * @apiDescription Endpoint for get link data
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [
   *        {
   *          "_id": "c48948sd4",
   *          "url": "URL",
   *          "author": "author name",
   *          ...
   *        }
   *     ]
   */

  getLinkList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validationResult: ValidatorResult = validateGetLinkList(req.body);
      if (!validationResult.valid) {
        // TODO: Error handling here
        throw new HttpException(
          StatusCodes.BAD_REQUEST,
          'Fields missing : ' + formatMissingFields(validationResult.errors)
        );
      }
      const data: Array<Link> = await this.linkService.getLinkList(
        req.context,
        new GetLinkListOptions(req.body.pageNumber, req.body.pageSize)
      );

      res.status(StatusCodes.OK).send(data);
    } catch (error) {
      next(error);
    }
  };
}

export default LinkController;
