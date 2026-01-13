export declare class QueryBuilder {
    prismaQuery: any;
    searchQuery: any;
    searchFields: any;
    pageNumber: number;
    totalItems: number;
    totalPages: number;
    pageLimit: number;
    apiFeature: any;
    constructor(prismaQuery: any, searchQuery: any, searchFields?: string[]);
    filter(): this;
    sort(): this;
    fields(): this;
    search(): this;
    pagination(): Promise<this>;
    _autoParse(val: any): any;
    buildQuery(): Promise<any>;
}
//# sourceMappingURL=queryBuilder.d.ts.map