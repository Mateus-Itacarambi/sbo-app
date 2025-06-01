import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client, Message } from "@stomp/stompjs";
import { NotificacaoDTO } from "@/types/notificacao";

type UseWebSocketNotificacoesProps = {
  userId: number;
  onNovaNotificacao: (notificacao: NotificacaoDTO) => void;
};

export function useWebSocketNotificacoes({ userId, onNovaNotificacao }: UseWebSocketNotificacoesProps) {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!userId || userId <= 0) return;

    const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        stompClient.subscribe(`/topic/notificacoes/${userId}`, (message) => {
          const notificacao: NotificacaoDTO = JSON.parse(message.body);
          onNovaNotificacao(notificacao);
        });
      },
      onStompError: (frame) => {
        console.error("Erro STOMP", frame);
      },
    });

    stompClient.activate();
    clientRef.current = stompClient;

    return () => {
      clientRef.current?.deactivate();
    };
  }, [userId, onNovaNotificacao]);

}

