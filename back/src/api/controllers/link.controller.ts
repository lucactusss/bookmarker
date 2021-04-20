import express, { Request, Response, NextFunction } from 'express';
import { ValidatorResult } from 'jsonschema';
import HttpException from '../../infra/errors/HttpException';
import { IController } from '../../models/api/IController';
import { formatMissingFields } from '../../utils/error.utils';
import {
  validateAddKeywordToLink,
  validateCreateLink,
  validateGetLinkList,
} from '../validators';
import LinkService from '../../business/link/link.service';
import {
  AddKeywordToLinkOptions,
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
    this.router.post(`${this.path}/:linkId/keyword`, this.addKeywordToLink);
    this.router.delete(
      `${this.path}/:linkId/keyword/:keywordId`,
      this.removeKeywordToLink
    );
    this.router.post(`${this.path}/data`, this.getLinkList);
    this.router.get(`${this.path}/count`, this.getLinkListCount);
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

  /**
   * @apiVersion 0.0.1
   * @api {get} /links/count GetLinkListCount
   * @apiName GetLinkListCount
   * @apiGroup Link
   *
   * @apiDescription Endpoint for get links count
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "count": 666
   *     }
   */
  getLinkListCount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const count: number = await this.linkService.getLinkListCount(
        req.context
      );

      res.status(StatusCodes.OK).send({ count });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @apiVersion 0.0.1
   * @api {post} /links/:linkId/keyword AddKeywordToLink
   * @apiName AddKeywordToLink
   * @apiGroup Link
   *
   * @apiParam {string} keywordId internal identifier to the keyword
   * @apiParam {string} label Label of the keyword
   * @apiParam {string} color Color of the keyword
   *
   * @apiDescription Endpoint for adding a Keyword (existing or not) to an existing Link
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   */
  addKeywordToLink = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const command = {
        linkId: req.params.linkId,
        ...req.body,
      };
      const validationResult: ValidatorResult = validateAddKeywordToLink(
        command
      );
      if (!validationResult.valid) {
        // TODO: Error handling here
        throw new HttpException(
          StatusCodes.BAD_REQUEST,
          'Fields missing : ' + formatMissingFields(validationResult.errors)
        );
      }
      await this.linkService.addKeywordToLink(
        req.context,
        new AddKeywordToLinkOptions(
          command.linkId,
          command.keywordId,
          command.color,
          command.label
        )
      );

      res.status(StatusCodes.OK).send();
    } catch (error) {
      next(error);
    }
  };

  /**
   * @apiVersion 0.0.1
   * @api {delete} /links/:linkId/keyword/:keywordId RemoveKeywordToLink
   * @apiName RemoveKeywordToLink
   * @apiGroup Link
   *
   * @apiDescription Endpoint for removing an existing Keyword to an existing Link
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   */
  removeKeywordToLink = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.params.keywordId || !req.params.linkId) {
        throw new HttpException(
          400,
          'KeywordId and linkId are required in this endpoint !'
        );
      }
      await this.linkService.removeKeywordToLink(
        req.context,
        req.params.linkId,
        req.params.keywordId
      );

      res.status(StatusCodes.OK).send();
    } catch (error) {
      next(error);
    }
  };
}

export default LinkController;
