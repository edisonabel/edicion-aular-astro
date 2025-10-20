import json

with open('src/data/blog.json', 'r', encoding='utf-8') as f:
    blogs = json.load(f)

for blog in blogs:
    if blog['slug'] == 'formula-precios-alex-hormozi':
        with open('temp_blog_content.txt', 'w', encoding='utf-8') as out:
            out.write(blog['content'])
        print(f"Content extracted to temp_blog_content.txt")
        print(f"Length: {len(blog['content'])} characters")
        break
