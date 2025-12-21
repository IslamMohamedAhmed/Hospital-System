import { AppointmentStatus } from "../../../generated/prisma/enums.js";

export class QueryBuilder {
    prismaQuery: any;
    searchQuery: any;
    searchFields: any = [];
    pageNumber: number;
    totalItems: number;
    totalPages: number;
    pageLimit: number;
    apiFeature: any;
    constructor(prismaQuery: any, searchQuery: any, searchFields: string[] = []) {
        this.prismaQuery = prismaQuery;
        this.searchQuery = searchQuery;
        this.searchFields = Array.isArray(searchFields) ? searchFields : [];
        this.pageNumber = 1;
        this.totalItems = 0;
        this.totalPages = 0;
        this.pageLimit = 10;
        this.apiFeature = {
            where: {},
            select: {},
            orderBy: {},
            skip: 0,
            take: 0
        };


    }

    filter() {

        let filterObj = { ...this.searchQuery };
        let excludedFields = ['page', 'sort', 'fields', 'keyword', 'limit'];

        excludedFields.forEach(val => {
            delete filterObj[val];
        });
        for (const key in filterObj) {
            const value = filterObj[key];
            if (typeof value === 'object' && value !== null) {
                for (const op in value) {
                    const allowedOps = ['gt', 'gte', 'lt', 'lte'];
                    if (!allowedOps.includes(op)) delete value[op];
                    else value[op] = this._autoParse(value[op]);
                }
            } else {
                filterObj[key] = this._autoParse(value);
            }
        }
        this.apiFeature.where = {
            ...(this.apiFeature.where ?? {}),
            ...filterObj
        };
        return this;
    }

    sort() {
        if (this.searchQuery.sort) {
            let sortBy = { ...this.searchQuery.sort };
            for (const key in sortBy) {
                const value = sortBy[key];
                const allowedOps = ['asc', 'desc'];
                if (!allowedOps.includes(value.toLowerCase())) delete sortBy[key];
            }

            this.apiFeature.orderBy = Object.keys(sortBy).map(key => ({
                [key]: sortBy[key]
            }));
        }
        return this;
    }

    fields() {
        if (this.searchQuery.fields) {
            let fields: any = {};
            let selectedFields = this.searchQuery.fields.split(',');
            selectedFields.forEach((field: string) => {
                fields[field] = true;
            });
            this.apiFeature.select = {
                ...fields
            };
        }
        return this;
    }

    search() {

        const fields = Array.isArray(this.searchFields) ? this.searchFields : [];

        if (this.searchQuery.keyword && Array.isArray(fields) && fields.length > 0) {
            const keyword = this.searchQuery.keyword;
            const orConditions = fields.map(field => ({
                [field]: {
                    contains: keyword,
                    mode: 'insensitive'
                }
            }));
            this.apiFeature.where = {
                AND: [
                    ...(this.apiFeature.where ? [this.apiFeature.where] : []),
                    { OR: orConditions }
                ]
            };
        }
        return this;
    }

    async pagination() {
        if (this.searchQuery.page <= 0) this.searchQuery.page = 1;
        const page = Math.max(Number(this.searchQuery.page) || 1, 1);
        const limit = Number(this.searchQuery.limit) || 10;
        const skip = (page - 1) * limit;


        try {
            const totalItems = await this.prismaQuery.count({
                where: this.apiFeature.where
            });
            this.pageNumber = page;
            this.totalItems = totalItems;
            this.totalPages = Math.ceil(totalItems / limit);
            this.pageLimit = limit;
        } catch (err) {
            console.error("Error calculating total items:", err);
            this.pageNumber = page;
            this.totalItems = 0;
            this.totalPages = 0;
            this.pageLimit = limit;
        }
        this.apiFeature.skip = skip;
        this.apiFeature.take = limit;
        return this;
    }

    _autoParse(val: any) {
        if (typeof val === 'string') {
            const normalized = val.toUpperCase();
            normalized as AppointmentStatus;
            return Object.values(AppointmentStatus).includes(normalized as AppointmentStatus)
                ? (normalized as AppointmentStatus)
                : undefined;
        }
        if (val === 'true') return true;
        if (val === 'false') return false;
        const num = Number(val);
        if (!Number.isNaN(num) && String(val).trim() !== '') return num;
        const d = new Date(val);
        if (!Number.isNaN(d.getTime())) return d;
        return val;
    }

    async buildQuery() {

        if (this.apiFeature.select && Object.keys(this.apiFeature.select).length === 0) {
            delete this.apiFeature.select;
        }

        if (this.apiFeature.orderBy && Array.isArray(this.apiFeature.orderBy) && this.apiFeature.orderBy.length === 0) {
            delete this.apiFeature.orderBy;
        }
        return await this.prismaQuery.findMany(this.apiFeature);
    }


}



