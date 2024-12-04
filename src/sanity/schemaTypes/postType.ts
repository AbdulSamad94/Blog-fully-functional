import { defineField } from "sanity"
export default {
    name: 'blog',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Blog Title',
            type: 'string',
            validation: Rule => Rule.required().min(5).max(100),
        }),
        {
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
                source: "title",
                maxLength: 96,
            }
        },
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'Heading 1', value: 'h1' },
                        { title: 'Heading 2', value: 'h2' },
                        { title: 'Heading 3', value: 'h3' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Underline', value: 'underline' },
                        ],
                    },
                },
            ],
        }),
        defineField({
            name: 'dateCreated',
            title: 'Date Created',
            type: 'datetime',
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
                timeStep: 15,
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'authorImage',
            title: 'Author Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'blogImage',
            title: 'Blog Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: Rule => Rule.required(),
        }),
    ],
}
