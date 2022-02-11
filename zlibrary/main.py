import sys
import asyncio
import random
from libasync import AsyncZlib

async def main():
	
    lib = AsyncZlib()

    email_address_bank = [

        "noliki5365@petloca.com",
        "golava6358@goonby.com",
        "kihif83549@plexfirm.com",
        "cixose8227@petloca.com",
        "xobewom869@plexfirm.com",
        "ferixip802@plexfirm.com",
        "somive9637@petloca.com",
        "gogebe9672@petloca.com",
        "vokehos377@petloca.com",
        "tobef54361@diolang.com",
        "tomah57102@plexfirm.com",
        "gejofoh506@diolang.com",
        "penebak706@plexfirm.com",
        "xicev98180@plexfirm.com",
        "rehip92573@diolang.com",
        "lakaga6379@plexfirm.com",
        "wodopif456@goonby.com",
        "kimayi2712@goonby.com",
        "walece6933@goonby.com",
        "jalilec747@petloca.com"
    ]

    email_address = random.choice(email_address_bank)

    password = "12345678"

    await lib.login(email_address, password)

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
