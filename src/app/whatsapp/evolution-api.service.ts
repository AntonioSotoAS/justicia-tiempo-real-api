import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';

export interface EvolutionApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

export interface WhatsAppMessage {
  number: string;
  text: string;
  instance: string;
}

@Injectable()
export class EvolutionApiService {
  private readonly logger = new Logger(EvolutionApiService.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly instanceName: string;

  constructor(private configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('EVOLUTION_API_URL') || 'http://localhost:8080';
    this.apiKey = this.configService.get<string>('EVOLUTION_API_KEY') || '';
    this.instanceName = this.configService.get<string>('EVOLUTION_INSTANCE_NAME') || 'default';
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'apikey': this.apiKey,
    };
  }

  async sendMessage(message: WhatsAppMessage): Promise<EvolutionApiResponse> {
    try {
      this.logger.log(`Enviando mensaje a ${message.number} via Evolution API`);
      this.logger.log(`URL: ${this.baseUrl}/message/sendText/${this.instanceName}`);
      this.logger.log(`Headers: ${JSON.stringify(this.getHeaders())}`);
      
      // Verificar que el número tenga el formato correcto
      const numeroFormateado = this.formatearNumero(message.number);
      this.logger.log(`Número formateado: ${numeroFormateado}`);
      
      const response: AxiosResponse = await axios.post(
        `${this.baseUrl}/message/sendText/${this.instanceName}`,
        {
          number: numeroFormateado,
          text: message.text,
          options: {
            delay: 1200,
            presence: "composing"
          }
        },
        {
          headers: this.getHeaders(),
          timeout: 30000, // 30 segundos timeout
        }
      );

      this.logger.log(`Respuesta Evolution API: ${JSON.stringify(response.data)}`);

      // Evolution API no siempre retorna 'success', pero si hay 'key' significa que se envió
      if (response.data && (response.data.success || response.data.key)) {
        return {
          success: true,
          message: 'Mensaje enviado exitosamente',
          data: response.data
        };
      } else {
        return {
          success: false,
          error: response.data?.message || 'Error desconocido al enviar mensaje'
        };
      }
    } catch (error) {
      this.logger.error(`Error enviando mensaje via Evolution API: ${error.message}`);
      
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.message || error.message;
        const errorData = error.response?.data;
        
        this.logger.error(`Error detallado: ${JSON.stringify(errorData)}`);
        
        return {
          success: false,
          error: `Error ${statusCode}: ${errorMessage}`
        };
      }
      
      return {
        success: false,
        error: `Error de conexión: ${error.message}`
      };
    }
  }

  private formatearNumero(numero: string): string {
    // Remover espacios y caracteres especiales
    let numeroLimpio = numero.replace(/[^\d]/g, '');
    
    // Si no tiene código de país, agregar +51 (Perú)
    if (!numeroLimpio.startsWith('51') && numeroLimpio.length === 9) {
      numeroLimpio = '51' + numeroLimpio;
    }
    
    // Para Evolution API, solo necesitamos el número con código de país
    return numeroLimpio;
  }

  async checkInstanceStatus(): Promise<EvolutionApiResponse> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseUrl}/instance/connectionState/${this.instanceName}`,
        {
          headers: this.getHeaders(),
          timeout: 10000,
        }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      this.logger.error(`Error verificando estado de instancia: ${error.message}`);
      return {
        success: false,
        error: `Error verificando instancia: ${error.message}`
      };
    }
  }

  async getMessageStatus(messageId: string): Promise<EvolutionApiResponse> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseUrl}/chat/findMessages/${this.instanceName}`,
        {
          headers: this.getHeaders(),
          params: { where: JSON.stringify({ key: { id: messageId } }) }
        }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      this.logger.error(`Error obteniendo estado del mensaje: ${error.message}`);
      return {
        success: false,
        error: `Error obteniendo estado: ${error.message}`
      };
    }
  }

  async createInstance(): Promise<EvolutionApiResponse> {
    try {
      const response: AxiosResponse = await axios.post(
        `${this.baseUrl}/instance/create`,
        {
          instanceName: this.instanceName,
          qrcode: true,
          integration: 'WHATSAPP-BAILEYS'
        },
        {
          headers: this.getHeaders(),
        }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      this.logger.error(`Error creando instancia: ${error.message}`);
      return {
        success: false,
        error: `Error creando instancia: ${error.message}`
      };
    }
  }

  async getQRCode(): Promise<EvolutionApiResponse> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseUrl}/instance/connect/${this.instanceName}`,
        {
          headers: this.getHeaders(),
        }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      this.logger.error(`Error obteniendo QR: ${error.message}`);
      return {
        success: false,
        error: `Error obteniendo QR: ${error.message}`
      };
    }
  }
}
