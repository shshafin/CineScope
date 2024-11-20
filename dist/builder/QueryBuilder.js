"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
// ! query builders
class QueryBuilder {
    constructor(query, modelQuery) {
        this.query = query;
        this.modelQuery = modelQuery;
    }
    // ! search
    search(searchableFields) {
        var _a, _b, _c;
        let searchTerm = "";
        if ((_a = this.query) === null || _a === void 0 ? void 0 : _a.searchTerm) {
            searchTerm = (_b = this.query) === null || _b === void 0 ? void 0 : _b.searchTerm;
        }
        this.modelQuery = (_c = this.modelQuery) === null || _c === void 0 ? void 0 : _c.find({
            $or: searchableFields.map((field) => ({
                [field]: { $regex: searchTerm, $options: "i" },
            })),
        });
        return this;
    }
    // ! paginate
    paginate() {
        var _a, _b, _c, _d;
        const limit = Number(((_a = this.query) === null || _a === void 0 ? void 0 : _a.limit) || 10);
        let skip = 0;
        if ((_b = this.query) === null || _b === void 0 ? void 0 : _b.page) {
            const page = Number(((_c = this.query) === null || _c === void 0 ? void 0 : _c.page) || 1);
            skip = Number((page - 1) * limit);
        }
        this.modelQuery = (_d = this.modelQuery) === null || _d === void 0 ? void 0 : _d.skip(skip).limit(limit);
        return this;
    }
    // ! sort
    sort() {
        var _a, _b, _c;
        let sortBy = "-releaseDate";
        if ((_a = this.query) === null || _a === void 0 ? void 0 : _a.sortBy) {
            sortBy = (_b = this.query) === null || _b === void 0 ? void 0 : _b.sortBy;
        }
        this.modelQuery = (_c = this.modelQuery) === null || _c === void 0 ? void 0 : _c.sort(sortBy);
        return this;
    }
    // ! field filtering
    field() {
        var _a, _b, _c;
        let fields = " ";
        if ((_a = this.query) === null || _a === void 0 ? void 0 : _a.fields) {
            fields = ((_b = this.query) === null || _b === void 0 ? void 0 : _b.fields).split(",").join(" ");
        }
        this.modelQuery = (_c = this.modelQuery) === null || _c === void 0 ? void 0 : _c.select(fields);
        return this;
    }
    // ! filter
    filter() {
        var _a;
        const queryObj = Object.assign({}, this.query);
        const excludeFields = ["searchTerm", "limit", "page", "sortBy", "fields"];
        excludeFields.forEach((e) => delete queryObj[e]);
        this.modelQuery = (_a = this.modelQuery) === null || _a === void 0 ? void 0 : _a.find(queryObj);
        return this;
    }
}
exports.QueryBuilder = QueryBuilder;
