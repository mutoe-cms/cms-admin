declare namespace defs {
  export class ArticleEntity {
    /** content */
    content?: string

    /** createdAt */
    createdAt: string

    /** id */
    id: number

    /** title */
    title: string

    /** updatedAt */
    updatedAt: string

    /** user */
    user: defs.UserEntity
  }

  export class ArticlesRo {
    /** items */
    items: defs.ArticleEntity[]

    /** meta */
    meta: any
  }

  export class AuthRo {
    /** bio */
    bio?: string

    /** createdAt */
    createdAt: string

    /** email */
    email: string

    /** id */
    id: number

    /** image */
    image?: string

    /** token */
    token: string

    /** updatedAt */
    updatedAt: string

    /** username */
    username: string
  }

  export class CreateArticleDto {
    /** content */
    content: string

    /** title */
    title: string
  }

  export class LoginDto {
    /** password */
    password: string

    /** username */
    username: string
  }

  export class PaginationMeta {
    /** currentPage */
    currentPage: number

    /** limit */
    limit: number

    /** total */
    total: number

    /** totalPages */
    totalPages: number
  }

  export class ProfileRo {
    /** bio */
    bio?: string

    /** createdAt */
    createdAt: string

    /** email */
    email: string

    /** id */
    id: number

    /** image */
    image?: string

    /** updatedAt */
    updatedAt: string

    /** username */
    username: string
  }

  export class RegisterDto {
    /** email */
    email: string

    /** password */
    password: string

    /** username */
    username: string
  }

  export class UserEntity {
    /** bio */
    bio?: string

    /** createdAt */
    createdAt: string

    /** email */
    email: string

    /** id */
    id: number

    /** image */
    image?: string

    /** updatedAt */
    updatedAt: string

    /** username */
    username: string
  }
}
