import "isomorphic-fetch";


class $0dcd7098129de788$export$ef88aa0d34c34520 {
    BASE_URL = "https://the-one-api.dev/";
    constructor(config){
        if (!config.apiKey) throw new Error("No API key provided");
        this.apiKey = config.apiKey;
        this.version = config.version || "v2";
    }
    async request(path, options, config) {
        const url = new URL(`${this.BASE_URL}${this.version}${path}`);
        const searchParams = this.generateSearchParams(options);
        url.search = searchParams;
        const headers = new Headers({
            Authorization: `Bearer ${this.apiKey}`,
            Accept: "application/json"
        });
        const response = await fetch(url, {
            ...config,
            headers: headers
        });
        if (response.status === 429) throw new Error("Rate limit exceeded");
        return response.json();
    }
    generateSearchParams(options) {
        const params = new URLSearchParams();
        if (options?.pagination) {
            const { limit: limit , page: page , offset: offset  } = options.pagination;
            if (limit) params.append("limit", limit.toString());
            if (page) params.append("page", page.toString());
            if (offset) params.append("offset", offset.toString());
        }
        if (options?.sort) {
            const [key, order] = options.sort;
            params.append("sort", `${key}:${order}`);
        }
        if (options?.filter?.match) {
            const { match: match  } = options.filter;
            for(const key in match)params.append(key, Array.isArray(match[key]) ? match[key].join(",") : match[key]);
        }
        let paramsString = params.toString();
        if (options?.filter?.range) {
            const { range: range  } = options.filter;
            for(const key in range)paramsString += `&${key}${range[key][0]}${range[key][1]}`;
        }
        return paramsString;
    }
}


class $12ae4c6f177c2a16$export$b89db09a01235f6f extends (0, $0dcd7098129de788$export$ef88aa0d34c34520) {
    /**
   * Fetches a list of movies
   * @returns An API response with a list of movies
   */ async list(pagination, sort, filter) {
        return this.request("/movie", {
            pagination: pagination,
            sort: sort,
            filter: filter
        });
    }
    /**
   * Fetches a single movie
   * @param id The id of the movie
   * @returns An API response with a single movie
   */ async get(id) {
        return this.request(`/movie/${id}`);
    }
    /**
   * Fetches a list of quotes for a movie
   * @param id The id of the movie to fetch quotes for
   * @returns An API response with a list of quotes from the movie
   */ async getQuotes(id, pagination, sort, filter) {
        return this.request(`/movie/${id}/quote`, {
            pagination: pagination,
            sort: sort,
            filter: filter
        });
    }
}



class $e1b00a6caf564234$export$d459179d2c3ffa58 extends (0, $0dcd7098129de788$export$ef88aa0d34c34520) {
    /**
   * Fetches a list of quotes
   * @returns An API response with a list of quotes
   */ async list(pagination, sort, filter) {
        return this.request("/quote", {
            pagination: pagination,
            sort: sort,
            filter: filter
        });
    }
    /**
   * Fetches a single quote
   * @param id The id of the quote
   * @returns An API response with a single quote
   */ async get(id, pagination, sort, filter) {
        return this.request(`/quote/${id}`, {
            pagination: pagination,
            sort: sort,
            filter: filter
        });
    }
}


class $149c1bd638913645$export$2e2bcd8739ae039 {
    constructor(config){
        this.movies = new (0, $12ae4c6f177c2a16$export$b89db09a01235f6f)(config);
        this.quotes = new (0, $e1b00a6caf564234$export$d459179d2c3ffa58)(config);
    }
}


export {$149c1bd638913645$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=module.mjs.map
