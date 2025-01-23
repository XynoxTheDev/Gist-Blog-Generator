'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from 'lucide-react'
import { useToast } from "../hooks/use-toast"
import dynamic from 'next/dynamic'

function BlogMarkdownGeneratorComponent() {
    const [mounted, setMounted] = useState(false)
    const [blogData, setBlogData] = useState({
        title: '',
        author: '',
        coverImage: '',
        introduction: '',
        sections: [{ title: '', content: '' }],
        conclusion: '',
        authorBio: '',
        twitterHandle: '',
        linkedinProfile: '',
        githubUsername: '',
    })
    const [generatedMarkdown, setGeneratedMarkdown] = useState('')
    const [isCopied, setIsCopied] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Loading...</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-96 flex items-center justify-center">
                        <div className="animate-pulse">Loading editor...</div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setBlogData(prev => ({ ...prev, [name]: value }))
    }

    const handleSectionChange = (index: number, field: 'title' | 'content', value: string) => {
        setBlogData(prev => ({
            ...prev,
            sections: prev.sections.map((section, i) =>
                i === index ? { ...section, [field]: value } : section
            )
        }))
    }

    const addSection = () => {
        setBlogData(prev => ({
            ...prev,
            sections: [...prev.sections, { title: '', content: '' }]
        }))
    }

    const generateMarkdown = () => {
        let markdown = `# ${blogData.title}\n\n`
        markdown += `*By [${blogData.author}](https://your-website.com)*\n\n`
        markdown += blogData.coverImage ? `![Blog Cover Image](${blogData.coverImage})\n\n` : ''

        markdown += `## Table of Contents\n`
        markdown += `- [Introduction](#introduction)\n`
        blogData.sections.forEach((section, index) => {
            if (section.title) {
                markdown += `- [${section.title}](#section-${index + 1}-${section.title.toLowerCase().replace(/\s+/g, '-')})\n`
            }
        })
        markdown += `- [Conclusion](#conclusion)\n\n`

        markdown += `## Introduction\n\n${blogData.introduction}\n\n`

        blogData.sections.forEach((section, index) => {
            if (section.title) {
                markdown += `## Section ${index + 1}: ${section.title}\n\n${section.content}\n\n`
            }
        })

        markdown += `## Conclusion\n\n${blogData.conclusion}\n\n---\n\n`

        if (blogData.author || blogData.authorBio) {
            markdown += `### About the Author\n\n`
            markdown += `**${blogData.author}** ${blogData.authorBio}\n\n`
        }

        if (blogData.twitterHandle || blogData.linkedinProfile || blogData.githubUsername) {
            markdown += `Connect with me:\n`
            if (blogData.twitterHandle) markdown += `- [Twitter](https://twitter.com/${blogData.twitterHandle})\n`
            if (blogData.linkedinProfile) markdown += `- [LinkedIn](${blogData.linkedinProfile})\n`
            if (blogData.githubUsername) markdown += `- [GitHub](https://github.com/${blogData.githubUsername})\n`
            markdown += '\n'
        }

        markdown += `---\n\n`
        if (blogData.twitterHandle) {
            markdown += `*Did you find this blog post helpful? [Share it on Twitter](https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20blog%20post%20by%20@${blogData.twitterHandle}:%20https://gist.github.com/your-gist-url)*\n\n`
        }
        markdown += `*For more content like this, [subscribe to my newsletter](https://your-newsletter-url.com).*`

        setGeneratedMarkdown(markdown)
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(generatedMarkdown)
            setIsCopied(true)
            toast({
                title: "Copied!",
                description: "Markdown has been copied to clipboard.",
            })
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
            toast({
                title: "Error",
                description: "Failed to copy. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Blog Markdown Generator</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="input" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="input">Input</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="input">
                        <form className="space-y-4">
                            <div>
                                <Label htmlFor="title">Blog Title</Label>
                                <Input id="title" name="title" value={blogData.title} onChange={handleInputChange} />
                            </div>
                            <div>
                                <Label htmlFor="author">Author Name</Label>
                                <Input id="author" name="author" value={blogData.author} onChange={handleInputChange} />
                            </div>
                            <div>
                                <Label htmlFor="coverImage">Cover Image URL</Label>
                                <Input id="coverImage" name="coverImage" value={blogData.coverImage} onChange={handleInputChange} />
                            </div>
                            <div>
                                <Label htmlFor="introduction">Introduction</Label>
                                <Textarea id="introduction" name="introduction" value={blogData.introduction} onChange={handleInputChange} />
                            </div>
                            {blogData.sections.map((section, index) => (
                                <div key={index} className="space-y-2">
                                    <Label htmlFor={`section-${index}-title`}>Section {index + 1} Title</Label>
                                    <Input
                                        id={`section-${index}-title`}
                                        value={section.title}
                                        onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                                    />
                                    <Label htmlFor={`section-${index}-content`}>Section {index + 1} Content</Label>
                                    <Textarea
                                        id={`section-${index}-content`}
                                        value={section.content}
                                        onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                                    />
                                </div>
                            ))}
                            <Button type="button" onClick={addSection}>Add Section</Button>
                            <div>
                                <Label htmlFor="conclusion">Conclusion</Label>
                                <Textarea id="conclusion" name="conclusion" value={blogData.conclusion} onChange={handleInputChange} />
                            </div>
                            <div>
                                <Label htmlFor="authorBio">Author Bio</Label>
                                <Textarea id="authorBio" name="authorBio" value={blogData.authorBio} onChange={handleInputChange} />
                            </div>
                            <div>
                                <Label htmlFor="twitterHandle">Twitter Handle</Label>
                                <Input id="twitterHandle" name="twitterHandle" value={blogData.twitterHandle} onChange={handleInputChange} />
                            </div>
                            <div>
                                <Label htmlFor="linkedinProfile">LinkedIn Profile URL</Label>
                                <Input id="linkedinProfile" name="linkedinProfile" value={blogData.linkedinProfile} onChange={handleInputChange} />
                            </div>
                            <div>
                                <Label htmlFor="githubUsername">GitHub Username</Label>
                                <Input id="githubUsername" name="githubUsername" value={blogData.githubUsername} onChange={handleInputChange} />
                            </div>
                        </form>
                    </TabsContent>
                    <TabsContent value="preview">
                        <div className="bg-muted p-4 rounded-md relative">
                            <pre className="whitespace-pre-wrap">{generatedMarkdown}</pre>
                            {generatedMarkdown && (
                                <Button
                                    className="absolute top-2 right-2"
                                    size="icon"
                                    onClick={copyToClipboard}
                                    aria-label="Copy to clipboard"
                                >
                                    {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={generateMarkdown}>Generate Markdown</Button>
                <Button
                    onClick={copyToClipboard}
                    disabled={!generatedMarkdown}
                    className="ml-2"
                >
                    {isCopied ? 'Copied!' : 'Copy Markdown'}
                </Button>
            </CardFooter>
        </Card>
    )
}

export const BlogMarkdownGenerator = dynamic(() => Promise.resolve(BlogMarkdownGeneratorComponent), {
    ssr: false
})
