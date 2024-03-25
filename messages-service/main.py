from fastapi import FastAPI
import uvicorn
import asyncio
import pika.adapters.asyncio_connection as asyncio_connection
import pika
import os


class ConsumerManager(object):

    def __init__(self, connection: pika.SelectConnection):
        self.__connection = connection
        self.__channel = self.__connection.channel()
        # try:
        #     self.__queue_name = os.environ["QUEUE_NAME"]
        # except KeyError:
        #     self.__queue_name = "task_queue"
        #
        # self.__channel.queue_declare(queue=self.__queue_name, durable=True)
        #
        # self.__channel.basic_qos(prefetch_count=1)

    async def start_consuming(self, body_parser: lambda x: None):
        await self.__channel.basic_consume(self.__queue_name,
                                     on_message_callback=lambda *x: self.callback(*x, body_parser))
        await self.__channel.start_consuming()

    def callback(self, ch, method, properties, body, body_parser):
        print(body)
        print(f" [x] Received {body}")
        body_parser(body)
        print(" [x] Done")
        ch.basic_ack(delivery_tag=method.delivery_tag)

    # def __del__(self):
    #     self.__connection.close()


class MessageService(object):
    def __init__(self, consumer_manager: ConsumerManager):
        self.__messages: list[str] = []
        self.__consumer_manager = consumer_manager
        self.__consumer_manager.start_consuming(lambda x: print("handling: ", x))

    @property
    def messages(self) -> list[str]:
        # in perfect pythonic world it should return a copy, since no constant references
        return self.__messages

    # def add_message(self, message: str):
    #     self.__messages.append(message)


class MessageController(object):
    def __init__(self, message_service: MessageService):
        self.__message_service = message_service

    async def get(self):
        print(self.__message_service.messages)
        return self.__message_service.messages


# get_controller = lambda: None
#
#
# def set_controller(controller):
#     global get_controller
#     print("setting controller")
#     get_controller = lambda: controller


app = FastAPI()

# @app.get("/")
# async def get():
#     return await get_controller().get()

import functools
import logging
import time
import pika

from pika.adapters.asyncio_connection import AsyncioConnection
from pika.exchange_type import ExchangeType

LOG_FORMAT = ('%(levelname) -10s %(asctime)s %(name) -30s %(funcName) '
              '-35s %(lineno) -5d: %(message)s')
LOGGER = logging.getLogger(__name__)



# params = {}
data = []
@app.on_event('startup')
async def startup():

    loop = asyncio.get_running_loop()


    from pprint import pprint
    async def run_pika():
        import aio_pika
        # aio_pika.connection
        connection = await aio_pika.connect_robust(host="rabbitmq", loop=loop)
        async with connection:
            queue_name = "task_queue"

            # Creating channel
            channel: aio_pika.abc.AbstractChannel = await connection.channel()

            # Declaring queue
            queue: aio_pika.abc.AbstractQueue = await channel.declare_queue(
                queue_name,
                durable=True
            )
            async with queue.iterator() as queue_iter:
            # Cancel consuming after __aexit__
                async for message in queue_iter:
                    async with message.process():
                        data.append(message.body)
                        print(message.body)

                        if queue.name in message.body.decode():
                            break


    # consumer_manager  = ConsumerManager(connection)
    # message_service = MessageService(consumer_manager)
    # message_controller = MessageController(message_service)
    # params["message_controller"] = message_controller
    loop.create_task(run_pika())

@app.get("/")
async def get():
    return data
#
#     result = await params["message_controller"].get()
#     print(result)
#     return result


if __name__ == '__main__':
    try:
        port = int(os.environ["SERVER_PORT"])
    except KeyError:
        port = 8000

    uvicorn.run(app, port=port, host='messages')
