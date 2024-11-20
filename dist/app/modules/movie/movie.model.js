"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = exports.movieSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const date_fns_1 = require("date-fns");
const slugify_1 = __importDefault(require("slugify"));
exports.movieSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    genre: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    viewCount: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 },
    slug: { type: String },
});
// pre hook middleware:slug creation
exports.movieSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // title-date
        const date = (0, date_fns_1.format)(this === null || this === void 0 ? void 0 : this.releaseDate, "dd-MM-yyyy");
        // slug creating
        this.slug = (0, slugify_1.default)(`${this === null || this === void 0 ? void 0 : this.title}-${date}`, { lower: true });
        next();
    });
});
exports.movieSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
exports.movieSchema.pre("findOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.findOne({ isDeleted: { $ne: true } });
        next();
    });
});
exports.Movie = mongoose_1.default.model("Movie", exports.movieSchema);
