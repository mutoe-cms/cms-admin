/* eslint-disable */
/* tslint:disable */
// noinspection PointlessBooleanExpressionJS,JSValidateJSDoc,JSUnusedGlobalSymbols,TypeScriptFieldCanBeMadeReadonly

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
  /** @example "foo@example.com" */
  email: string;
  /** @example "foo" */
  username: string;
  /** @example "2020-08-16T00:04:59.343Z" */
  createdAt: string;
  /** @example "2020-08-16T00:04:59.343Z" */
  updatedAt: string;
  /** @example "This guy is lazy and has left nothing." */
  bio?: string;
  /** @example "https://picsum.photos/200" */
  image?: string;
}

export interface RegisterDto {
  /** @example "foo@example.com" */
  email: string;
  /** @example "username" */
  username: string;
  /** @example "123456" */
  password: string;
}

export interface AuthRo {
  /** @example 1 */
  id: number;
  /** @example "foo@example.com" */
  email: string;
  /** @example "foo" */
  username: string;
  /** @example "2020-08-16T00:04:59.343Z" */
  createdAt: string;
  /** @example "2020-08-16T00:04:59.343Z" */
  updatedAt: string;
  /** @example "This guy is lazy and has left nothing." */
  bio?: string;
  /** @example "https://picsum.photos/200" */
  image?: string;
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiZm9vQGV4YW1wbGUuY29tIiwiaWF0IjoxNTk3NTY1MDk5fQ.qRFuw88Zw7l5KY3TSuyr8hpan0fzH9HcDtkKYrLvQRQ" */
  token: string;
}

export interface LoginDto {
  /** @example "admin" */
  username: string;
  /** @example "123456" */
  password: string;
}

export interface CreateArticleDto {
  /** @example "Lorem ipsum" */
  title: string;
  /** @example 1 */
  categoryId?: number;
  /** @example ["semantic-ui","material-ui"] */
  tags?: string[];
  /**
   * HTML content
   * @example "<p>Hello <strong>Mutoe CMS</strong></p>"
   */
  content?: string;
}

export interface UserSafeEntity {
  /** @example 1 */
  id: number;
  /** @example "mutoe@foxmail.com" */
  email: string;
  /** @example "mutoe" */
  username: string;
  /** @example "This guy is lazy and has left nothing." */
  bio?: string;
  /** @example "https://imgur.com/200" */
  image?: string;
  /** @example "2020-08-16T00:04:59.343Z" */
  createdAt: string;
  /** @example "2020-08-16T00:04:59.343Z" */
  updatedAt: string;
}

export interface CategoryEntity {
  /** @example 1 */
  id: number;
  /** Category parent */
  parent?: CategoryEntity;
  /** Category children */
  children: CategoryEntity[];
  /** @example "study-notes" */
  key: string;
  /** @example "Study notes" */
  label: string;
  /**
   * HTML content
   * @example "<p>Hello <strong>Mutoe CMS</strong></p>"
   */
  description?: string;
  /** @example "2020-08-16T00:04:59.343Z" */
  createdAt: string;
  /** @example "2020-08-16T00:04:59.343Z" */
  updatedAt: string;
}

export interface TagEntity {
  /** @example "semantic-ui" */
  key: string;
  /** @example "Semantic UI" */
  name: string;
  /**
   * HTML content
   * @example "<p>Hello <strong>Mutoe CMS</strong></p>"
   */
  description?: string;
  /** @example "2020-08-16T00:04:59.343Z" */
  createdAt: string;
  /** @example "2020-08-16T00:04:59.343Z" */
  updatedAt: string;
}

export interface ArticleEntity {
  /** @example 1 */
  id: number;
  /** Article author */
  author: UserSafeEntity;
  /** @example "Lorem ipsum" */
  title: string;
  /** Article category */
  category?: CategoryEntity;
  /** Article tags */
  tags: TagEntity[];
  /**
   * HTML content
   * @example "<p>Hello <strong>Mutoe CMS</strong></p>"
   */
  content?: string;
  /** @example "2020-08-16T00:04:59.343Z" */
  createdAt: string;
  /** @example "2020-08-16T00:04:59.343Z" */
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

export interface CreateCategoryDto {
  /** @example "study-notes" */
  key: string;
  /** @example "Study notes" */
  label: string;
  /**
   * HTML content
   * @example "<p>Hello <strong>Mutoe CMS</strong></p>"
   */
  description?: string;
  /** @example 1 */
  parentId?: number;
}

export interface CreateTagDto {
  /** @example "Semantic UI" */
  name: string;
  /** @example "semantic-ui" */
  key: string;
  /**
   * HTML content
   * @example "<p>Hello <strong>Mutoe CMS</strong></p>"
   */
  description?: string;
}

export interface TagsRo {
  items: TagEntity[];
  meta: PaginationMeta;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";

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
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title CMS
 * @version 0.3.2
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
    healthCheck: (
      query?: {
        /** @example "foo" */
        name?: string;
      },
      params: RequestParams = {},
    ) =>
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
      this.request<AuthRo, any>({
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
    retrieveArticles: (
      query?: {
        /** @example 1 */
        page?: number;
        /** @example 10 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ArticlesRo, any>({
        path: `/api/article`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Article
     * @name RetrieveArticle
     * @summary Retrieve article by article id
     * @request GET:/api/article/{articleId}
     */
    retrieveArticle: (articleId: number, params: RequestParams = {}) =>
      this.request<ArticleEntity, void>({
        path: `/api/article/${articleId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Article
     * @name UpdateArticle
     * @summary Update article
     * @request PUT:/api/article/{articleId}
     * @secure
     */
    updateArticle: (articleId: number, data: CreateArticleDto, params: RequestParams = {}) =>
      this.request<ArticleEntity, void>({
        path: `/api/article/${articleId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  category = {
    /**
     * No description
     *
     * @tags Category
     * @name CreateCategory
     * @summary Create a category
     * @request POST:/api/category
     * @secure
     */
    createCategory: (data: CreateCategoryDto, params: RequestParams = {}) =>
      this.request<CategoryEntity, void>({
        path: `/api/category`,
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
     * @tags Category
     * @name RetrieveRootCategories
     * @summary Retrieve some categories that not have parent category
     * @request GET:/api/category
     */
    retrieveRootCategories: (params: RequestParams = {}) =>
      this.request<CategoryEntity[], void>({
        path: `/api/category`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Category
     * @name RetrieveCategory
     * @summary Retrieve a category
     * @request GET:/api/category/{categoryId}
     */
    retrieveCategory: (categoryId: number, params: RequestParams = {}) =>
      this.request<CategoryEntity, void>({
        path: `/api/category/${categoryId}`,
        method: "GET",
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

    /**
     * No description
     *
     * @tags Tag
     * @name RetrieveTags
     * @summary Retrieve tags
     * @request GET:/api/tag
     */
    retrieveTags: (
      query?: {
        /** @example 1 */
        page?: number;
        /** @example 10 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<TagsRo, any>({
        path: `/api/tag`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
