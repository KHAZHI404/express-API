// наборы данных для тестов:

import {BlogDbType, OutputBlogType} from "../src/input-output-types/blogs-types";
import {WithId} from "mongodb";

export const blog1: OutputBlogType = {
    id: "Date.now() + Math.random()",
    name: 't' + Date.now() + Math.random(),
    description: 'a' + Date.now() + Math.random(),
    websiteUrl: "true",
    createdAt: "null",
    isMembership: true,
}