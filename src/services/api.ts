/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ProfileRo {
  /** @example 1 */
  id: number;

  /** @example foo@example.com */
  email: string;

  /** @example foo */
  username: string;

  /** @example 2020-08-16T00:04:59.343Z */
  createdAt: string;

  /** @example 2020-08-16T00:04:59.343Z */
  updatedAt: string;

  /** @example null */
  bio?: string;

  /** @example https://picsum.photos/200 */
  image?: string;
}

export interface RegisterDto {
  /** @example foo@example.com */
  email: string;

  /** @example username */
  username: string;

  /** @example 123456 */
  password: string;
}

export interface AuthRo {
  /** @example 1 */
  id: number;

  /** @example foo@example.com */
  email: string;

  /** @example foo */
  username: string;

  /** @example 2020-08-16T00:04:59.343Z */
  createdAt: string;

  /** @example 2020-08-16T00:04:59.343Z */
  updatedAt: string;

  /** @example null */
  bio?: string;

  /** @example https://picsum.photos/200 */
  image?: string;

  /** @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiZm9vQGV4YW1wbGUuY29tIiwiaWF0IjoxNTk3NTY1MDk5fQ.qRFuw88Zw7l5KY3TSuyr8hpan0fzH9HcDtkKYrLvQRQ */
  token: string;
}

export interface LoginDto {
  /** @example admin */
  username: string;

  /** @example 123456 */
  password: string;
}

export interface CreateArticleDto {
  /** @example Lorem ipsum */
  title: string;

  /** @example ["semantic-ui","material-ui"] */
  tags?: string[];

  /** @example <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p> */
  content?: string;
}

export interface ArticleEntity {
  /** @example 1 */
  id: number;
  user: object;

  /** @example Lorem ipsum */
  title: string;

  /** @example <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p> */
  content?: string;

  /** @example 2020-08-16T00:04:59.343Z */
  createdAt: string;

  /** @example 2020-08-16T00:04:59.343Z */
  updatedAt: string;
}

export interface PaginationMeta {
  /** @example 15 */
  total: number;

  /** @example 10 */
  limit: number;

  /** @example 2 */
  totalPages: number;

  /** @example 1 */
  currentPage: number;
}

export interface ArticlesRo {
  items: ArticleEntity[];
  meta: PaginationMeta;
}

export interface CreateTagDto {
  /** @example Semantic UI */
  name: string;

  /** @example semantic-ui */
  key: string;

  /** @example <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p> */
  description?: string;
}

export interface TagEntity {
  /** @example semantic-ui */
  key: string;

  /** @example Semantic UI */
  name: string;

  /** @example <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p> */
  description?: string;

  /** @example 2020-08-16T00:04:59.343Z */
  createdAt: string;

  /** @example 2020-08-16T00:04:59.343Z */
  updatedAt: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios'

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  private instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];

  constructor({ securityWorker, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  public request = async <T = any, E = any>({
    secure,
    path,
    type,
    query,
    format = "json",
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams = (secure && this.securityWorker && (await this.securityWorker(this.securityData))) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: format,
      data: body,
      url: path,
    });
  };
}

/**
 * @title CMS
 * @version 0.3.0
 * @contact
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  app = {
    /**
     * No description
     *
     * @tags App
     * @name HealthCheck
     * @summary Health check
     * @request GET:/api/hello
     */
    healthCheck: (query?: { name?: string }, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api/hello`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags User
     * @name Profile
     * @request GET:/api/user
     * @secure
     */
    profile: (params: RequestParams = {}) =>
      this.request<ProfileRo, void>({
        path: `/api/user`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name Register
     * @summary register
     * @request POST:/api/auth/register
     */
    register: (data: RegisterDto, params: RequestParams = {}) =>
      this.request<AuthRo, { "[field: string]": "isNotEmpty" | "isExist" | "isNotExist" | "isInvalid" }>({
        path: `/api/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name Login
     * @summary login
     * @request POST:/api/auth/login
     */
    login: (data: LoginDto, params: RequestParams = {}) =>
      this.request<AuthRo, any>({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  article = {
    /**
     * No description
     *
     * @tags Article
     * @name CreateArticle
     * @summary Create article
     * @request POST:/api/article
     * @secure
     */
    createArticle: (data: CreateArticleDto, params: RequestParams = {}) =>
      this.request<ArticleEntity, void>({
        path: `/api/article`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Article
     * @name RetrieveArticles
     * @summary Retrieve articles
     * @request GET:/api/article
     */
    retrieveArticles: (query?: { page?: number; limit?: number }, params: RequestParams = {}) =>
      this.request<ArticlesRo, any>({
        path: `/api/article`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  tag = {
    /**
     * No description
     *
     * @tags Tag
     * @name CreateTag
     * @summary Create tag
     * @request POST:/api/tag
     * @secure
     */
    createTag: (data: CreateTagDto, params: RequestParams = {}) =>
      this.request<TagEntity, void>({
        path: `/api/tag`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
