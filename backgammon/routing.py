from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/initial-dices/', consumers.BackGammonConsumer.as_asgi()),
    re_path(r'ws/get-dice-value/', consumers.DiceValueConsumer.as_asgi()),
    re_path(r'ws/roll-dices/', consumers.RollAnimationConsumer.as_asgi()),
    re_path(r'ws/move-pieces/', consumers.MovePiecesConsumer.as_asgi()),
    re_path(r'ws/move-to-bar/', consumers.MovePieceToBar.as_asgi()),
]