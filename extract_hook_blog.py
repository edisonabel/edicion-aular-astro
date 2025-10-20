import json

with open('src/data/blog.json', 'r', encoding='utf-8') as f:
    blogs = json.load(f)

for blog in blogs:
    if blog['slug'] == 'hook-story-offer-formula-ventas':
        with open('temp_hook_content.txt', 'w', encoding='utf-8') as out:
            out.write(blog['content'])
        print(f"Content extracted to temp_hook_content.txt")
        print(f"Length: {len(blog['content'])} characters")
        
        # También mostrar una parte del contenido con listas
        import re
        ols = re.findall(r'<ol>.*?</ol>', blog['content'], re.DOTALL)
        if ols:
            with open('temp_hook_ols.txt', 'w', encoding='utf-8') as out:
                for idx, ol in enumerate(ols):
                    out.write(f"\n\n===== OL #{idx+1} =====\n{ol}")
            print(f"Found {len(ols)} <ol> blocks in temp_hook_ols.txt")
        break
