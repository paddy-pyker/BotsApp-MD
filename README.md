# BotsApp-MD
Whatsapp Bot with multi-device support
> Your Personal Assisstant, on WhatsApp!

## Deployment

### Easiest Way

Head over to [botsapp-md](http://botsapp-md.herokuapp.com) to deploy.
Takes only a click and 5mins

### Using Docker locally

You will need to have docker installed on your machine and have some experience using docker.

To host the bot on your own device using docker, follow the following steps on your terminal / command prompt -

```bash
git clone https://github.com/Paddy-Pyker/BotsApp-MD.git
cd BotsApp-MD
docker build -t botsapp-md .
docker run --name botsapp-md --restart always -v botsapp-md:/etc/botsapp-md botsapp-md
```

This will create a container running BotsApp. You'll have to scan the QR generated in terminal at least once.

### The GNU/Linux Legacy Way

To use this method, you will need **nodejs** and **yarn** installed on your device.

To run the bot on your device manually, you can use the following commands -

```bash
git clone https://github.com/Paddy-Pyker/BotsApp-MD.git
cd BotsApp-MD
yarn start
```
## Inspiration
- [Baileys Multi-Device Library](https://github.com/adiwajshing/Baileys)
- [BotsAppOfficial](https://github.com/BotsAppOfficial/BotsApp)

## Legal
This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by WhatsApp or any of its affiliates or subsidiaries. This is an 
independent and unofficial software. Use at your own risk.
