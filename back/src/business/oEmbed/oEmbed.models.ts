export class OEmbedLink {
  type: string;
  version: string;
  title: string;
  author_name: string;
  author_url: string;
  provider_url: string;
  provider_name: string;
  cache_age: string;
  thumbnail_url: string;
  thumbnail_width: string;
  thumbnail_height: string;

  constructor(
    type: string,
    version: string,
    title: string,
    author_name: string,
    author_url: string,
    provider_url: string,
    provider_name: string,
    cache_age: string,
    thumbnail_url: string,
    thumbnail_width: string,
    thumbnail_height: string
  ) {
    this.type = type;
    this.version = version;
    this.title = title;
    this.author_name = author_name;
    this.author_url = author_url;
    this.provider_url = provider_url;
    this.provider_name = provider_name;
    this.cache_age = cache_age;
    this.thumbnail_url = thumbnail_url;
    this.thumbnail_width = thumbnail_width;
    this.thumbnail_height = thumbnail_height;
  }
}

export class OEmbedPhotoLink extends OEmbedLink {
  url: string;
  width: number;
  height: number;

  constructor(
    type: string,
    version: string,
    title: string,
    author_name: string,
    author_url: string,
    provider_url: string,
    provider_name: string,
    cache_age: string,
    thumbnail_url: string,
    thumbnail_width: string,
    thumbnail_height: string,
    url: string,
    width: number,
    height: number
  ) {
    super(
      type,
      version,
      title,
      author_name,
      author_url,
      provider_url,
      provider_name,
      cache_age,
      thumbnail_url,
      thumbnail_width,
      thumbnail_height
    );
    this.url = url;
    this.width = width;
    this.height = height;
  }
}

export class OEmbedVideoLink extends OEmbedLink {
  html: string;
  width: number;
  height: number;
  duration: number;

  constructor(
    type: string,
    version: string,
    title: string,
    author_name: string,
    author_url: string,
    provider_url: string,
    provider_name: string,
    cache_age: string,
    thumbnail_url: string,
    thumbnail_width: string,
    thumbnail_height: string,
    html: string,
    width: number,
    height: number,
    duration: number
  ) {
    super(
      type,
      version,
      title,
      author_name,
      author_url,
      provider_url,
      provider_name,
      cache_age,
      thumbnail_url,
      thumbnail_width,
      thumbnail_height
    );
    this.html = html;
    this.width = width;
    this.height = height;
    this.duration = duration;
  }
}
