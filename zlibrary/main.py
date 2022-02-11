import sys
import asyncio
from libasync import AsyncZlib

async def main():
	
    lib = AsyncZlib()

    await lib.login("mixoc50575@petloca.com", "12345678")

    await lib.init()

    search_keyword = sys.argv[1]

    paginator = await lib.search(q=search_keyword)

    await paginator.next()

    try:
    	book = await paginator.result[0].fetch()
    	print(book)
    except:
    	sys.stderr.write("book not found")  
    

    

if __name__ == '__main__':
    asyncio.run(main())
