import express, { Request, Response, NextFunction } from 'express';
import { ValidatorResult } from 'jsonschema';
import HttpException from '../../infra/errors/HttpException';
import { IController } from '../../models/api/IController';
import { formatMissingFields } from '../../utils/error.utils';
import { validateCreateLink } from '../validators';
import LinkService from '../../business/link/linkService';
import { CreateLinkDTO } from '../../business/link/models';
import { StatusCodes } from 'http-status-codes';

class LinkController implements IController {
  public path = '/links';

  public router: express.Router = express.Router();
  public linkService = new LinkService();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.post(this.path, this.createLink);
  }

  /**
   * @apiVersion 0.0.1
   * @api {post} /link
   * @apiName CreateLink
   * @apiGroup Link
   *
   * @apiParam {String} url URL of the link
   * @apiParam {String} author user who created the link
   * @apiParam {String} title title of the link
   * @apiParam {Date} creationDate Date of initial creation
   *
   * @apiDescription Endpoint for creating a new link
   *
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 201 CREATED
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
      req.context.logger.info(`Create link post ! ${JSON.stringify(req.body)}`);

      const result = await this.linkService.createLink(
        req.context,
        new CreateLinkDTO(req.body.url, req.body.linkType)
      );

      res.status(StatusCodes.CREATED).send();
    } catch (error) {
      next(error);
    }
  };
}

export default LinkController;
