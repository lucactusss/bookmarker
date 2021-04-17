import express, { Request, Response, NextFunction } from 'express';
import { ValidatorResult } from 'jsonschema';
import HttpException from '../../infra/errors/HttpException';
import { IController } from '../../models/api/IController';
import { formatMissingFields } from '../../utils/error.utils';
import {
  validateCreateKeyword,
  validateGetKeywordList,
  validateUpdateKeyword,
} from '../validators';
import KeywordService from '../../business/keyword/keywordService';
import { StatusCodes } from 'http-status-codes';
import { Keyword } from '../../models/Keyword';
import { GetKeywordListOptions } from '../../business/keyword/keyword.models';

class KeywordController implements IController {
  public path = '/keywords';

  public router: express.Router = express.Router();
  public keywordService = new KeywordService();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.post(this.path, this.createKeyword);
    this.router.patch(this.path + '/:keywordId', this.updateKeyword);
    this.router.delete(this.path + '/:keywordId', this.deleteKeyword);
    this.router.post(this.path + '/data', this.getKeywordList);
  }

  /**
   * @apiVersion 0.0.1
   * @api {post} /keywords
   * @apiName CreateKeyword
   * @apiGroup Keyword
   *
   * @apiParam {String} label Keyword Label
   * @apiParam {String} color Keyword color (for front-end display)
   *
   * @apiDescription Endpoint for creating a new keyword
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 201 CREATED
   */
  createKeyword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validationResult: ValidatorResult = validateCreateKeyword(req.body);
      if (!validationResult.valid) {
        // TODO: Error handling here
        throw new HttpException(
          StatusCodes.BAD_REQUEST,
          'Fields missing : ' + formatMissingFields(validationResult.errors)
        );
      }
      await this.keywordService.createKeyword(
        req.context,
        req.body.label,
        req.body.color
      );

      res.status(StatusCodes.CREATED).send();
    } catch (error) {
      next(error);
    }
  };

  /**
   * @apiVersion 0.0.1
   * @api {patch} /keywords/:keywordId UpdateKeyword
   * @apiName UpdateKeyword
   * @apiGroup Keyword
   *
   * @apiParam {String} keywordId Keyword unique identifier
   * @apiParam {String} label Keyword Label
   * @apiParam {String} color Keyword color (for front-end display)
   *
   * @apiDescription Endpoint for updating an existing keyword
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   */
  updateKeyword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const command = {
        ...req.body,
        keywordId: req.params.keywordId,
      };
      const validationResult: ValidatorResult = validateUpdateKeyword(command);
      if (!validationResult.valid) {
        // TODO: Error handling here
        throw new HttpException(
          StatusCodes.BAD_REQUEST,
          'Fields missing : ' + formatMissingFields(validationResult.errors)
        );
      }
      await this.keywordService.updateKeyword(
        req.context,
        command.keywordId,
        command.label,
        command.color
      );

      res.status(StatusCodes.OK).send();
    } catch (error) {
      next(error);
    }
  };

  /**
   * @apiVersion 0.0.1
   * @api {delete} /keywords/:keywordId DeleteKeyword
   * @apiName DeleteKeyword
   * @apiGroup Keyword
   *
   * @apiParam {String} keywordId Keyword unique identifier
   *
   * @apiDescription Endpoint for deleting an existing keyword
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   */
  deleteKeyword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.params.keywordId) {
        throw new HttpException(400, 'No keywordId found in the request!');
      }
      await this.keywordService.deleteKeyword(
        req.context,
        req.params.keywordId
      );

      res.status(StatusCodes.OK).send();
    } catch (error) {
      next(error);
    }
  };

  /**
   * @apiVersion 0.0.1
   * @api {post} /keywords/data GetKeywordsList
   * @apiName GetKeywordsList
   * @apiGroup Keyword
   *
   * @apiParam {String} filterText Text to use to filter keyword labels
   * @apiParam {number} pageSize Size of data to return
   * @apiParam {number} pageNumber get data of x page - calculate offset with pageNumber * pageSize
   *
   * @apiDescription Endpoint for get keyword data
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [
   *        {
   *          "_id": "c48948sd4",
   *          "label": "Bees",
   *          "color": "#FC3252"
   *        }
   *     ]
   */
  getKeywordList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validationResult: ValidatorResult = validateGetKeywordList(
        req.body
      );
      if (!validationResult.valid) {
        // TODO: Error handling here
        throw new HttpException(
          StatusCodes.BAD_REQUEST,
          'Fields missing : ' + formatMissingFields(validationResult.errors)
        );
      }
      const data: Array<Keyword> = await this.keywordService.getKeywordList(
        req.context,
        new GetKeywordListOptions(
          req.body.filterText,
          req.body.pageNumber,
          req.body.pageSize
        )
      );

      res.status(StatusCodes.OK).send(data);
    } catch (error) {
      next(error);
    }
  };
}

export default KeywordController;
