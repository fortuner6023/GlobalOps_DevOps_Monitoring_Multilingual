/**
 * Pre-translated versions of every mock message used by lib/mock-data.ts.
 *
 * Why this file exists:
 *   The Lingo.dev SDK has a free-plan word quota. Mock data uses a finite set of
 *   ~50 strings repeated across every demo request. By hard-coding these
 *   translations we get instant, quota-free translations for all demo content
 *   while the SDK is still used (and cached) for real Supabase entries.
 */

export const MOCK_TRANSLATIONS: Record<string, Record<string, string>> = {
  // ─── Spanish ──────────────────────────────────────────────────────────────
  es: {
    // Log — ERROR
    "Connection timeout after 30000ms":
      "Tiempo de conexión agotado después de 30000ms",
    "Failed to authenticate user: invalid token":
      "Error al autenticar usuario: token inválido",
    "Database connection pool exhausted":
      "Pool de conexiones de base de datos agotado",
    "Payment processing failed: gateway timeout":
      "Error en el procesamiento de pago: tiempo de espera de la pasarela",
    "Memory usage exceeded 90% threshold":
      "Uso de memoria superó el umbral del 90%",
    "SSL certificate verification failed":
      "Verificación del certificado SSL fallida",
    "Rate limit exceeded for API endpoint /api/users":
      "Límite de velocidad excedido para el endpoint /api/users",
    "Disk space critically low on volume /data":
      "Espacio en disco críticamente bajo en el volumen /data",
    // Log — WARNING
    "High latency detected on database queries (>500ms)":
      "Alta latencia detectada en consultas de base de datos (>500ms)",
    "Cache miss rate increased to 45%":
      "La tasa de fallos de caché aumentó al 45%",
    "API response time degraded by 30%":
      "El tiempo de respuesta de la API se degradó un 30%",
    "Connection pool usage at 75%":
      "Uso del pool de conexiones al 75%",
    "Memory usage approaching threshold at 80%":
      "Uso de memoria acercándose al umbral del 80%",
    "Deprecated API version being used by 3 clients":
      "Versión de API obsoleta en uso por 3 clientes",
    "Background job queue depth exceeding normal levels":
      "La profundidad de la cola de trabajos supera los niveles normales",
    "Certificate expiring in 14 days":
      "El certificado expira en 14 días",
    // Log — INFO
    "Service deployed successfully v2.4.1":
      "Servicio desplegado exitosamente v2.4.1",
    "Database migration completed: added index on users.email":
      "Migración de base de datos completada: índice añadido en users.email",
    "Auto-scaling triggered: 3 → 5 instances":
      "Autoescalado activado: 3 → 5 instancias",
    "Backup completed successfully (2.3 GB)":
      "Copia de seguridad completada exitosamente (2.3 GB)",
    "Health check passed for all endpoints":
      "Verificación de estado superada para todos los endpoints",
    "New API key generated for service account":
      "Nueva clave de API generada para la cuenta de servicio",
    "Configuration reload completed":
      "Recarga de configuración completada",
    "Scheduled maintenance window started":
      "Ventana de mantenimiento programada iniciada",
    // Log — DEBUG
    "Request received: GET /api/users?page=1&limit=20":
      "Solicitud recibida: GET /api/users?page=1&limit=20",
    "Cache hit for key: user:12345:profile":
      "Acierto de caché para clave: user:12345:profile",
    "Database query executed in 12ms":
      "Consulta de base de datos ejecutada en 12ms",
    "WebSocket connection established from 192.168.1.100":
      "Conexión WebSocket establecida desde 192.168.1.100",
    "JWT token validated successfully for user admin@example.com":
      "Token JWT validado correctamente para admin@example.com",
    "Background job completed: email_queue processing":
      "Trabajo en segundo plano completado: procesamiento de email_queue",
    "Retry attempt 1/3 for external API call":
      "Intento de reintento 1/3 para llamada de API externa",
    "Response sent: 200 OK (45ms)":
      "Respuesta enviada: 200 OK (45ms)",
    // Alert titles
    "High Error Rate Detected":
      "Alta Tasa de Errores Detectada",
    "Database Connection Pool Exhausted":
      "Pool de Conexiones de Base de Datos Agotado",
    "Memory Usage Critical":
      "Uso de Memoria Crítico",
    "SSL Certificate Expiring":
      "Certificado SSL por Expirar",
    "Disk Space Low":
      "Espacio en Disco Bajo",
    "Service Unresponsive":
      "Servicio No Responde",
    "Unusual Traffic Pattern":
      "Patrón de Tráfico Inusual",
    "Deployment Failure":
      "Fallo en el Despliegue",
    // Alert descriptions
    "Error rate exceeded 5% threshold on api-gateway service. Current rate: 8.3%":
      "La tasa de errores superó el umbral del 5% en el servicio api-gateway. Tasa actual: 8.3%",
    "All 100 connections in the pool are in use. New requests are being queued.":
      "Las 100 conexiones del pool están en uso. Las nuevas solicitudes están en cola.",
    "Memory usage on payment-service has reached 95%. Immediate action required.":
      "El uso de memoria en payment-service alcanzó el 95%. Se requiere acción inmediata.",
    "SSL certificate for api.globalops.dev expires in 7 days. Renewal required.":
      "El certificado SSL para api.globalops.dev expira en 7 días. Se requiere renovación.",
    "Available disk space on /data volume is below 10%. Currently at 8.2% free.":
      "El espacio disponible en el volumen /data está por debajo del 10%. Actualmente al 8.2% libre.",
    "notification-service has not responded to health checks for the past 5 minutes.":
      "notification-service no ha respondido a las verificaciones de estado en los últimos 5 minutos.",
    "Traffic spike detected: 300% increase in requests to /api/auth endpoint.":
      "Pico de tráfico detectado: aumento del 300% en solicitudes al endpoint /api/auth.",
    "Deployment of user-service v2.5.0 failed. Rolling back to v2.4.9.":
      "El despliegue de user-service v2.5.0 falló. Revertiendo a v2.4.9.",
    // Insight titles
    "Recurring Database Timeouts":
      "Tiempos de Espera de Base de Datos Recurrentes",
    "Unusual Authentication Failures":
      "Fallos de Autenticación Inusuales",
    "Optimize API Gateway Caching":
      "Optimizar el Almacenamiento en Caché del API Gateway",
    "Memory Leak in User Service":
      "Fuga de Memoria en el Servicio de Usuario",
    "Enable Auto-Scaling for Payment Service":
      "Habilitar Auto-Escalado para el Servicio de Pago",
    "Error Pattern Detected in Services":
      "Patrón de Errores Detectado en los Servicios",
    // Insight descriptions
    "Detected a pattern of database connection timeouts occurring every 4 hours, correlating with the scheduled batch processing job. Consider optimizing the batch queries or increasing the connection pool size during batch windows.":
      "Se detectó un patrón de tiempos de espera en conexiones de base de datos cada 4 horas, correlacionado con el trabajo de procesamiento por lotes programado. Considere optimizar las consultas por lotes o aumentar el tamaño del pool durante las ventanas de procesamiento.",
    "Authentication failure rate spiked by 400% in the last hour from IP range 203.0.113.0/24. This could indicate a brute-force attack. Recommend enabling rate limiting and investigating the source.":
      "La tasa de fallos de autenticación aumentó un 400% en la última hora desde el rango de IP 203.0.113.0/24. Esto podría indicar un ataque de fuerza bruta. Se recomienda habilitar la limitación de velocidad e investigar la fuente.",
    "Analysis shows 60% of API gateway requests are cache misses for frequently accessed resources. Implementing a Redis cache layer could reduce response times by an estimated 40%.":
      "El análisis muestra que el 60% de las solicitudes al API gateway son fallos de caché para recursos frecuentemente accedidos. Implementar una capa de caché Redis podría reducir los tiempos de respuesta en un 40% estimado.",
    "Memory usage in user-service shows a steady 2% increase per hour without corresponding load increase. This suggests a memory leak, likely in the session management module.":
      "El uso de memoria en user-service muestra un aumento constante del 2% por hora sin un aumento de carga correspondiente. Esto sugiere una fuga de memoria, probablemente en el módulo de gestión de sesiones.",
    "Payment service consistently hits 80% CPU during peak hours (14:00-18:00 UTC). Configuring auto-scaling with a threshold of 70% would improve reliability.":
      "El servicio de pago alcanza constantemente el 80% de CPU durante las horas pico (14:00-18:00 UTC). Configurar el auto-escalado con un umbral del 70% mejoraría la fiabilidad.",
  },

  // ─── French ───────────────────────────────────────────────────────────────
  fr: {
    // Log — ERROR
    "Connection timeout after 30000ms":
      "Délai de connexion dépassé après 30000ms",
    "Failed to authenticate user: invalid token":
      "Échec d'authentification de l'utilisateur : jeton invalide",
    "Database connection pool exhausted":
      "Pool de connexions de base de données épuisé",
    "Payment processing failed: gateway timeout":
      "Échec du traitement du paiement : délai de la passerelle dépassé",
    "Memory usage exceeded 90% threshold":
      "L'utilisation de la mémoire a dépassé le seuil de 90%",
    "SSL certificate verification failed":
      "Échec de la vérification du certificat SSL",
    "Rate limit exceeded for API endpoint /api/users":
      "Limite de débit dépassée pour le point d'accès API /api/users",
    "Disk space critically low on volume /data":
      "Espace disque dangereusement faible sur le volume /data",
    // Log — WARNING
    "High latency detected on database queries (>500ms)":
      "Latence élevée détectée sur les requêtes de base de données (>500ms)",
    "Cache miss rate increased to 45%":
      "Le taux d'échec de cache a augmenté à 45%",
    "API response time degraded by 30%":
      "Le temps de réponse de l'API s'est dégradé de 30%",
    "Connection pool usage at 75%":
      "Utilisation du pool de connexions à 75%",
    "Memory usage approaching threshold at 80%":
      "L'utilisation de la mémoire approche le seuil de 80%",
    "Deprecated API version being used by 3 clients":
      "Version d'API obsolète utilisée par 3 clients",
    "Background job queue depth exceeding normal levels":
      "La profondeur de la file des tâches dépasse les niveaux normaux",
    "Certificate expiring in 14 days":
      "Le certificat expire dans 14 jours",
    // Log — INFO
    "Service deployed successfully v2.4.1":
      "Service déployé avec succès v2.4.1",
    "Database migration completed: added index on users.email":
      "Migration de base de données terminée : index ajouté sur users.email",
    "Auto-scaling triggered: 3 → 5 instances":
      "Mise à l'échelle automatique déclenchée : 3 → 5 instances",
    "Backup completed successfully (2.3 GB)":
      "Sauvegarde terminée avec succès (2.3 Go)",
    "Health check passed for all endpoints":
      "Vérification de l'état réussie pour tous les points d'accès",
    "New API key generated for service account":
      "Nouvelle clé API générée pour le compte de service",
    "Configuration reload completed":
      "Rechargement de la configuration terminé",
    "Scheduled maintenance window started":
      "Fenêtre de maintenance planifiée démarrée",
    // Log — DEBUG
    "Request received: GET /api/users?page=1&limit=20":
      "Requête reçue : GET /api/users?page=1&limit=20",
    "Cache hit for key: user:12345:profile":
      "Correspondance dans le cache pour la clé : user:12345:profile",
    "Database query executed in 12ms":
      "Requête de base de données exécutée en 12ms",
    "WebSocket connection established from 192.168.1.100":
      "Connexion WebSocket établie depuis 192.168.1.100",
    "JWT token validated successfully for user admin@example.com":
      "Jeton JWT validé avec succès pour admin@example.com",
    "Background job completed: email_queue processing":
      "Tâche en arrière-plan terminée : traitement de email_queue",
    "Retry attempt 1/3 for external API call":
      "Tentative de réessai 1/3 pour l'appel API externe",
    "Response sent: 200 OK (45ms)":
      "Réponse envoyée : 200 OK (45ms)",
    // Alert titles
    "High Error Rate Detected":
      "Taux d'Erreur Élevé Détecté",
    "Database Connection Pool Exhausted":
      "Pool de Connexions de Base de Données Épuisé",
    "Memory Usage Critical":
      "Utilisation Mémoire Critique",
    "SSL Certificate Expiring":
      "Certificat SSL Expirant",
    "Disk Space Low":
      "Espace Disque Faible",
    "Service Unresponsive":
      "Service Ne Répond Pas",
    "Unusual Traffic Pattern":
      "Schéma de Trafic Inhabituel",
    "Deployment Failure":
      "Échec du Déploiement",
    // Alert descriptions
    "Error rate exceeded 5% threshold on api-gateway service. Current rate: 8.3%":
      "Le taux d'erreur a dépassé le seuil de 5% sur le service api-gateway. Taux actuel : 8.3%",
    "All 100 connections in the pool are in use. New requests are being queued.":
      "Les 100 connexions du pool sont utilisées. Les nouvelles requêtes sont mises en file d'attente.",
    "Memory usage on payment-service has reached 95%. Immediate action required.":
      "L'utilisation de la mémoire sur payment-service a atteint 95%. Une action immédiate est requise.",
    "SSL certificate for api.globalops.dev expires in 7 days. Renewal required.":
      "Le certificat SSL pour api.globalops.dev expire dans 7 jours. Renouvellement requis.",
    "Available disk space on /data volume is below 10%. Currently at 8.2% free.":
      "L'espace disque disponible sur le volume /data est inférieur à 10%. Actuellement à 8.2% libre.",
    "notification-service has not responded to health checks for the past 5 minutes.":
      "notification-service n'a pas répondu aux vérifications d'état depuis 5 minutes.",
    "Traffic spike detected: 300% increase in requests to /api/auth endpoint.":
      "Pic de trafic détecté : augmentation de 300% des requêtes vers le point d'accès /api/auth.",
    "Deployment of user-service v2.5.0 failed. Rolling back to v2.4.9.":
      "Le déploiement de user-service v2.5.0 a échoué. Retour à la version v2.4.9.",
    // Insight titles
    "Recurring Database Timeouts":
      "Délais d'Attente de Base de Données Récurrents",
    "Unusual Authentication Failures":
      "Échecs d'Authentification Inhabituels",
    "Optimize API Gateway Caching":
      "Optimiser le Cache de l'API Gateway",
    "Memory Leak in User Service":
      "Fuite Mémoire dans le Service Utilisateur",
    "Enable Auto-Scaling for Payment Service":
      "Activer la Mise à l'Échelle Automatique pour le Service de Paiement",
    "Error Pattern Detected in Services":
      "Schéma d'Erreur Détecté dans les Services",
    // Insight descriptions
    "Detected a pattern of database connection timeouts occurring every 4 hours, correlating with the scheduled batch processing job. Consider optimizing the batch queries or increasing the connection pool size during batch windows.":
      "Un schéma de délais d'attente de connexion à la base de données a été détecté, survenant toutes les 4 heures, corrélé avec le traitement par lots planifié. Envisagez d'optimiser les requêtes par lots ou d'augmenter la taille du pool pendant ces fenêtres.",
    "Authentication failure rate spiked by 400% in the last hour from IP range 203.0.113.0/24. This could indicate a brute-force attack. Recommend enabling rate limiting and investigating the source.":
      "Le taux d'échec d'authentification a augmenté de 400% dans la dernière heure depuis la plage d'IP 203.0.113.0/24. Cela pourrait indiquer une attaque par force brute. Recommande d'activer la limitation de débit et d'enquêter sur la source.",
    "Analysis shows 60% of API gateway requests are cache misses for frequently accessed resources. Implementing a Redis cache layer could reduce response times by an estimated 40%.":
      "L'analyse montre que 60% des requêtes de l'API gateway sont des échecs de cache pour des ressources fréquemment consultées. Implémenter une couche de cache Redis pourrait réduire les temps de réponse d'environ 40%.",
    "Memory usage in user-service shows a steady 2% increase per hour without corresponding load increase. This suggests a memory leak, likely in the session management module.":
      "L'utilisation de la mémoire dans user-service montre une augmentation constante de 2% par heure sans augmentation de charge correspondante. Cela suggère une fuite mémoire, probablement dans le module de gestion des sessions.",
    "Payment service consistently hits 80% CPU during peak hours (14:00-18:00 UTC). Configuring auto-scaling with a threshold of 70% would improve reliability.":
      "Le service de paiement atteint constamment 80% du CPU pendant les heures de pointe (14h00-18h00 UTC). Configurer la mise à l'échelle automatique avec un seuil de 70% améliorerait la fiabilité.",
  },

  // ─── German ───────────────────────────────────────────────────────────────
  de: {
    // Log — ERROR
    "Connection timeout after 30000ms":
      "Verbindungstimeout nach 30000ms",
    "Failed to authenticate user: invalid token":
      "Benutzerauthentifizierung fehlgeschlagen: ungültiges Token",
    "Database connection pool exhausted":
      "Datenbankverbindungspool erschöpft",
    "Payment processing failed: gateway timeout":
      "Zahlungsverarbeitung fehlgeschlagen: Gateway-Timeout",
    "Memory usage exceeded 90% threshold":
      "Speichernutzung überschritt 90%-Schwellenwert",
    "SSL certificate verification failed":
      "SSL-Zertifikatüberprüfung fehlgeschlagen",
    "Rate limit exceeded for API endpoint /api/users":
      "Ratenlimit für API-Endpunkt /api/users überschritten",
    "Disk space critically low on volume /data":
      "Kritisch wenig Speicherplatz auf Volume /data",
    // Log — WARNING
    "High latency detected on database queries (>500ms)":
      "Hohe Latenz bei Datenbankabfragen erkannt (>500ms)",
    "Cache miss rate increased to 45%":
      "Cache-Fehlerrate auf 45% gestiegen",
    "API response time degraded by 30%":
      "API-Antwortzeit um 30% verschlechtert",
    "Connection pool usage at 75%":
      "Verbindungspool-Auslastung bei 75%",
    "Memory usage approaching threshold at 80%":
      "Speichernutzung nähert sich 80%-Schwellenwert",
    "Deprecated API version being used by 3 clients":
      "Veraltete API-Version wird von 3 Clients verwendet",
    "Background job queue depth exceeding normal levels":
      "Warteschlangentiefe für Hintergrundjobs überschreitet normale Werte",
    "Certificate expiring in 14 days":
      "Zertifikat läuft in 14 Tagen ab",
    // Log — INFO
    "Service deployed successfully v2.4.1":
      "Dienst erfolgreich bereitgestellt v2.4.1",
    "Database migration completed: added index on users.email":
      "Datenbankmigration abgeschlossen: Index auf users.email hinzugefügt",
    "Auto-scaling triggered: 3 → 5 instances":
      "Auto-Skalierung ausgelöst: 3 → 5 Instanzen",
    "Backup completed successfully (2.3 GB)":
      "Sicherung erfolgreich abgeschlossen (2.3 GB)",
    "Health check passed for all endpoints":
      "Gesundheitsprüfung für alle Endpunkte bestanden",
    "New API key generated for service account":
      "Neuer API-Schlüssel für Dienstkonto generiert",
    "Configuration reload completed":
      "Konfigurationsneuladung abgeschlossen",
    "Scheduled maintenance window started":
      "Geplantes Wartungsfenster gestartet",
    // Log — DEBUG
    "Request received: GET /api/users?page=1&limit=20":
      "Anfrage empfangen: GET /api/users?page=1&limit=20",
    "Cache hit for key: user:12345:profile":
      "Cache-Treffer für Schlüssel: user:12345:profile",
    "Database query executed in 12ms":
      "Datenbankabfrage in 12ms ausgeführt",
    "WebSocket connection established from 192.168.1.100":
      "WebSocket-Verbindung von 192.168.1.100 hergestellt",
    "JWT token validated successfully for user admin@example.com":
      "JWT-Token erfolgreich für Benutzer admin@example.com validiert",
    "Background job completed: email_queue processing":
      "Hintergrundjob abgeschlossen: email_queue-Verarbeitung",
    "Retry attempt 1/3 for external API call":
      "Wiederholungsversuch 1/3 für externen API-Aufruf",
    "Response sent: 200 OK (45ms)":
      "Antwort gesendet: 200 OK (45ms)",
    // Alert titles
    "High Error Rate Detected":
      "Hohe Fehlerrate Erkannt",
    "Database Connection Pool Exhausted":
      "Datenbankverbindungspool Erschöpft",
    "Memory Usage Critical":
      "Speichernutzung Kritisch",
    "SSL Certificate Expiring":
      "SSL-Zertifikat Läuft Ab",
    "Disk Space Low":
      "Wenig Speicherplatz",
    "Service Unresponsive":
      "Dienst Antwortet Nicht",
    "Unusual Traffic Pattern":
      "Ungewöhnliches Datenverkehrsmuster",
    "Deployment Failure":
      "Bereitstellungsfehler",
    // Alert descriptions
    "Error rate exceeded 5% threshold on api-gateway service. Current rate: 8.3%":
      "Fehlerrate überschritt 5%-Schwelle im api-gateway-Dienst. Aktuelle Rate: 8.3%",
    "All 100 connections in the pool are in use. New requests are being queued.":
      "Alle 100 Verbindungen im Pool werden genutzt. Neue Anfragen werden in die Warteschlange gestellt.",
    "Memory usage on payment-service has reached 95%. Immediate action required.":
      "Speichernutzung im payment-service hat 95% erreicht. Sofortiges Handeln erforderlich.",
    "SSL certificate for api.globalops.dev expires in 7 days. Renewal required.":
      "SSL-Zertifikat für api.globalops.dev läuft in 7 Tagen ab. Erneuerung erforderlich.",
    "Available disk space on /data volume is below 10%. Currently at 8.2% free.":
      "Verfügbarer Speicherplatz auf Volume /data unter 10%. Aktuell 8.2% frei.",
    "notification-service has not responded to health checks for the past 5 minutes.":
      "notification-service hat in den letzten 5 Minuten nicht auf Gesundheitsprüfungen reagiert.",
    "Traffic spike detected: 300% increase in requests to /api/auth endpoint.":
      "Datenverkehrsspitze erkannt: 300% Zunahme bei Anfragen an /api/auth-Endpunkt.",
    "Deployment of user-service v2.5.0 failed. Rolling back to v2.4.9.":
      "Bereitstellung von user-service v2.5.0 fehlgeschlagen. Rollback auf v2.4.9.",
    // Insight titles
    "Recurring Database Timeouts":
      "Wiederkehrende Datenbank-Timeouts",
    "Unusual Authentication Failures":
      "Ungewöhnliche Authentifizierungsfehler",
    "Optimize API Gateway Caching":
      "API-Gateway-Caching Optimieren",
    "Memory Leak in User Service":
      "Speicherleck im Benutzerdienst",
    "Enable Auto-Scaling for Payment Service":
      "Auto-Skalierung für Zahlungsdienst Aktivieren",
    "Error Pattern Detected in Services":
      "Fehlermuster in Diensten Erkannt",
    // Insight descriptions
    "Detected a pattern of database connection timeouts occurring every 4 hours, correlating with the scheduled batch processing job. Consider optimizing the batch queries or increasing the connection pool size during batch windows.":
      "Ein Muster von Datenbankverbindungs-Timeouts alle 4 Stunden wurde erkannt, korreliert mit dem geplanten Stapelverarbeitungsjob. Erwägen Sie die Optimierung der Stapelabfragen oder die Erhöhung des Verbindungspools während der Stapelfenster.",
    "Authentication failure rate spiked by 400% in the last hour from IP range 203.0.113.0/24. This could indicate a brute-force attack. Recommend enabling rate limiting and investigating the source.":
      "Die Authentifizierungsfehlerrate stieg in der letzten Stunde um 400% aus dem IP-Bereich 203.0.113.0/24. Dies könnte auf einen Brute-Force-Angriff hinweisen. Ratenlimitierung aktivieren und die Quelle untersuchen.",
    "Analysis shows 60% of API gateway requests are cache misses for frequently accessed resources. Implementing a Redis cache layer could reduce response times by an estimated 40%.":
      "Analyse zeigt, dass 60% der API-Gateway-Anfragen Cache-Fehler für häufig aufgerufene Ressourcen sind. Eine Redis-Cache-Schicht könnte die Antwortzeiten um etwa 40% reduzieren.",
    "Memory usage in user-service shows a steady 2% increase per hour without corresponding load increase. This suggests a memory leak, likely in the session management module.":
      "Speichernutzung im user-service zeigt einen stetigen Anstieg von 2% pro Stunde ohne entsprechende Lasterhöhung. Dies deutet auf ein Speicherleck hin, wahrscheinlich im Sitzungsverwaltungsmodul.",
    "Payment service consistently hits 80% CPU during peak hours (14:00-18:00 UTC). Configuring auto-scaling with a threshold of 70% would improve reliability.":
      "Zahlungsdienst erreicht während der Stoßzeiten (14:00-18:00 UTC) konstant 80% CPU. Auto-Skalierung mit 70%-Schwelle würde die Zuverlässigkeit verbessern.",
  },

  // ─── Japanese ─────────────────────────────────────────────────────────────
  ja: {
    // Log — ERROR
    "Connection timeout after 30000ms":
      "30000ms後に接続タイムアウト",
    "Failed to authenticate user: invalid token":
      "ユーザー認証に失敗しました：無効なトークン",
    "Database connection pool exhausted":
      "データベース接続プールが枯渇しました",
    "Payment processing failed: gateway timeout":
      "決済処理に失敗しました：ゲートウェイタイムアウト",
    "Memory usage exceeded 90% threshold":
      "メモリ使用量が90%のしきい値を超えました",
    "SSL certificate verification failed":
      "SSL証明書の検証に失敗しました",
    "Rate limit exceeded for API endpoint /api/users":
      "APIエンドポイント /api/users のレート制限を超過しました",
    "Disk space critically low on volume /data":
      "ボリューム /data のディスク容量が危険なほど不足しています",
    // Log — WARNING
    "High latency detected on database queries (>500ms)":
      "データベースクエリで高レイテンシを検出 (>500ms)",
    "Cache miss rate increased to 45%":
      "キャッシュミス率が45%に増加しました",
    "API response time degraded by 30%":
      "APIレスポンスタイムが30%低下しました",
    "Connection pool usage at 75%":
      "接続プール使用率が75%に達しました",
    "Memory usage approaching threshold at 80%":
      "メモリ使用量が80%のしきい値に近づいています",
    "Deprecated API version being used by 3 clients":
      "廃止されたAPIバージョンが3つのクライアントで使用されています",
    "Background job queue depth exceeding normal levels":
      "バックグラウンドジョブキューの深さが通常レベルを超えています",
    "Certificate expiring in 14 days":
      "証明書は14日後に期限切れになります",
    // Log — INFO
    "Service deployed successfully v2.4.1":
      "サービスが正常にデプロイされました v2.4.1",
    "Database migration completed: added index on users.email":
      "データベース移行が完了しました：users.emailにインデックスを追加",
    "Auto-scaling triggered: 3 → 5 instances":
      "オートスケーリングが起動されました：3 → 5インスタンス",
    "Backup completed successfully (2.3 GB)":
      "バックアップが正常に完了しました (2.3 GB)",
    "Health check passed for all endpoints":
      "すべてのエンドポイントのヘルスチェックが合格しました",
    "New API key generated for service account":
      "サービスアカウントの新しいAPIキーが生成されました",
    "Configuration reload completed":
      "設定の再読み込みが完了しました",
    "Scheduled maintenance window started":
      "スケジュールされたメンテナンス時間が開始されました",
    // Log — DEBUG
    "Request received: GET /api/users?page=1&limit=20":
      "リクエストを受信しました：GET /api/users?page=1&limit=20",
    "Cache hit for key: user:12345:profile":
      "キーのキャッシュヒット：user:12345:profile",
    "Database query executed in 12ms":
      "データベースクエリが12msで実行されました",
    "WebSocket connection established from 192.168.1.100":
      "192.168.1.100からWebSocket接続が確立されました",
    "JWT token validated successfully for user admin@example.com":
      "admin@example.comのJWTトークンが正常に検証されました",
    "Background job completed: email_queue processing":
      "バックグラウンドジョブが完了しました：email_queue処理",
    "Retry attempt 1/3 for external API call":
      "外部API呼び出しの再試行1/3",
    "Response sent: 200 OK (45ms)":
      "レスポンスを送信しました：200 OK (45ms)",
    // Alert titles
    "High Error Rate Detected":
      "高いエラー率を検出",
    "Database Connection Pool Exhausted":
      "データベース接続プールが枯渇",
    "Memory Usage Critical":
      "メモリ使用量が危険水準",
    "SSL Certificate Expiring":
      "SSL証明書の有効期限切れ",
    "Disk Space Low":
      "ディスク容量が不足",
    "Service Unresponsive":
      "サービスが応答しない",
    "Unusual Traffic Pattern":
      "異常なトラフィックパターン",
    "Deployment Failure":
      "デプロイメント失敗",
    // Alert descriptions
    "Error rate exceeded 5% threshold on api-gateway service. Current rate: 8.3%":
      "api-gatewayサービスのエラー率が5%のしきい値を超えました。現在の率：8.3%",
    "All 100 connections in the pool are in use. New requests are being queued.":
      "プール内の100接続がすべて使用中です。新しいリクエストはキューに入れられています。",
    "Memory usage on payment-service has reached 95%. Immediate action required.":
      "payment-serviceのメモリ使用量が95%に達しました。即時対応が必要です。",
    "SSL certificate for api.globalops.dev expires in 7 days. Renewal required.":
      "api.globalops.devのSSL証明書は7日後に期限切れになります。更新が必要です。",
    "Available disk space on /data volume is below 10%. Currently at 8.2% free.":
      "/dataボリュームの空き容量が10%を下回っています。現在8.2%の空き容量です。",
    "notification-service has not responded to health checks for the past 5 minutes.":
      "notification-serviceは過去5分間ヘルスチェックに応答していません。",
    "Traffic spike detected: 300% increase in requests to /api/auth endpoint.":
      "トラフィックスパイクを検出：/api/authエンドポイントへのリクエストが300%増加。",
    "Deployment of user-service v2.5.0 failed. Rolling back to v2.4.9.":
      "user-service v2.5.0のデプロイに失敗しました。v2.4.9にロールバックします。",
    // Insight titles
    "Recurring Database Timeouts":
      "データベースタイムアウトの繰り返し",
    "Unusual Authentication Failures":
      "異常な認証失敗",
    "Optimize API Gateway Caching":
      "APIゲートウェイキャッシュの最適化",
    "Memory Leak in User Service":
      "ユーザーサービスのメモリリーク",
    "Enable Auto-Scaling for Payment Service":
      "決済サービスのオートスケーリングを有効化",
    "Error Pattern Detected in Services":
      "サービスでエラーパターンを検出",
    // Insight descriptions
    "Detected a pattern of database connection timeouts occurring every 4 hours, correlating with the scheduled batch processing job. Consider optimizing the batch queries or increasing the connection pool size during batch windows.":
      "4時間ごとにデータベース接続タイムアウトのパターンが検出されました。スケジュールされたバッチ処理ジョブと相関しています。バッチウィンドウ中のクエリの最適化または接続プールサイズの増加を検討してください。",
    "Authentication failure rate spiked by 400% in the last hour from IP range 203.0.113.0/24. This could indicate a brute-force attack. Recommend enabling rate limiting and investigating the source.":
      "IPレンジ203.0.113.0/24からの認証失敗率が過去1時間で400%急増しました。ブルートフォース攻撃の可能性があります。レート制限の有効化とソースの調査を推奨します。",
    "Analysis shows 60% of API gateway requests are cache misses for frequently accessed resources. Implementing a Redis cache layer could reduce response times by an estimated 40%.":
      "分析によると、APIゲートウェイリクエストの60%が頻繁にアクセスされるリソースのキャッシュミスです。Redisキャッシュレイヤーの実装により、レスポンスタイムを約40%削減できます。",
    "Memory usage in user-service shows a steady 2% increase per hour without corresponding load increase. This suggests a memory leak, likely in the session management module.":
      "user-serviceのメモリ使用量は、対応する負荷増加なしに毎時2%の安定した増加を示しています。これはメモリリークを示唆しており、おそらくセッション管理モジュールに問題があります。",
    "Payment service consistently hits 80% CPU during peak hours (14:00-18:00 UTC). Configuring auto-scaling with a threshold of 70% would improve reliability.":
      "決済サービスはピーク時間帯（14:00-18:00 UTC）に常にCPU80%に達します。70%のしきい値でオートスケーリングを設定することで信頼性が向上します。",
  },

  // ─── Chinese (Simplified) ─────────────────────────────────────────────────
  zh: {
    // Log — ERROR
    "Connection timeout after 30000ms":
      "连接超时，30000毫秒后",
    "Failed to authenticate user: invalid token":
      "用户认证失败：无效令牌",
    "Database connection pool exhausted":
      "数据库连接池已耗尽",
    "Payment processing failed: gateway timeout":
      "支付处理失败：网关超时",
    "Memory usage exceeded 90% threshold":
      "内存使用量超过90%阈值",
    "SSL certificate verification failed":
      "SSL证书验证失败",
    "Rate limit exceeded for API endpoint /api/users":
      "API端点 /api/users 的速率限制已超出",
    "Disk space critically low on volume /data":
      "卷 /data 上的磁盘空间严重不足",
    // Log — WARNING
    "High latency detected on database queries (>500ms)":
      "检测到数据库查询高延迟 (>500ms)",
    "Cache miss rate increased to 45%":
      "缓存未命中率增加到45%",
    "API response time degraded by 30%":
      "API响应时间下降30%",
    "Connection pool usage at 75%":
      "连接池使用率达75%",
    "Memory usage approaching threshold at 80%":
      "内存使用量接近80%阈值",
    "Deprecated API version being used by 3 clients":
      "已废弃的API版本被3个客户端使用",
    "Background job queue depth exceeding normal levels":
      "后台任务队列深度超过正常水平",
    "Certificate expiring in 14 days":
      "证书将在14天后到期",
    // Log — INFO
    "Service deployed successfully v2.4.1":
      "服务已成功部署 v2.4.1",
    "Database migration completed: added index on users.email":
      "数据库迁移完成：已在 users.email 上添加索引",
    "Auto-scaling triggered: 3 → 5 instances":
      "自动扩展已触发：3 → 5 个实例",
    "Backup completed successfully (2.3 GB)":
      "备份成功完成 (2.3 GB)",
    "Health check passed for all endpoints":
      "所有端点的健康检查均已通过",
    "New API key generated for service account":
      "已为服务账户生成新的API密钥",
    "Configuration reload completed":
      "配置重新加载完成",
    "Scheduled maintenance window started":
      "计划维护窗口已开始",
    // Log — DEBUG
    "Request received: GET /api/users?page=1&limit=20":
      "已接收请求：GET /api/users?page=1&limit=20",
    "Cache hit for key: user:12345:profile":
      "键的缓存命中：user:12345:profile",
    "Database query executed in 12ms":
      "数据库查询在12毫秒内执行",
    "WebSocket connection established from 192.168.1.100":
      "已从 192.168.1.100 建立 WebSocket 连接",
    "JWT token validated successfully for user admin@example.com":
      "已成功验证 admin@example.com 的 JWT 令牌",
    "Background job completed: email_queue processing":
      "后台任务已完成：email_queue 处理",
    "Retry attempt 1/3 for external API call":
      "外部API调用的重试尝试 1/3",
    "Response sent: 200 OK (45ms)":
      "已发送响应：200 OK (45ms)",
    // Alert titles
    "High Error Rate Detected":
      "检测到高错误率",
    "Database Connection Pool Exhausted":
      "数据库连接池已耗尽",
    "Memory Usage Critical":
      "内存使用量严重",
    "SSL Certificate Expiring":
      "SSL证书即将到期",
    "Disk Space Low":
      "磁盘空间不足",
    "Service Unresponsive":
      "服务无响应",
    "Unusual Traffic Pattern":
      "异常流量模式",
    "Deployment Failure":
      "部署失败",
    // Alert descriptions
    "Error rate exceeded 5% threshold on api-gateway service. Current rate: 8.3%":
      "api-gateway服务的错误率超过了5%阈值。当前率：8.3%",
    "All 100 connections in the pool are in use. New requests are being queued.":
      "连接池中的100个连接均在使用中。新请求正在排队。",
    "Memory usage on payment-service has reached 95%. Immediate action required.":
      "payment-service的内存使用量已达到95%。需要立即采取行动。",
    "SSL certificate for api.globalops.dev expires in 7 days. Renewal required.":
      "api.globalops.dev的SSL证书将在7天后到期。需要续期。",
    "Available disk space on /data volume is below 10%. Currently at 8.2% free.":
      "/data卷上的可用磁盘空间低于10%。目前剩余8.2%。",
    "notification-service has not responded to health checks for the past 5 minutes.":
      "notification-service在过去5分钟内未响应健康检查。",
    "Traffic spike detected: 300% increase in requests to /api/auth endpoint.":
      "检测到流量激增：/api/auth端点的请求增加了300%。",
    "Deployment of user-service v2.5.0 failed. Rolling back to v2.4.9.":
      "user-service v2.5.0 部署失败。正在回滚到 v2.4.9。",
    // Insight titles
    "Recurring Database Timeouts":
      "反复出现的数据库超时",
    "Unusual Authentication Failures":
      "异常认证失败",
    "Optimize API Gateway Caching":
      "优化API网关缓存",
    "Memory Leak in User Service":
      "用户服务内存泄漏",
    "Enable Auto-Scaling for Payment Service":
      "为支付服务启用自动扩展",
    "Error Pattern Detected in Services":
      "在服务中检测到错误模式",
    // Insight descriptions
    "Detected a pattern of database connection timeouts occurring every 4 hours, correlating with the scheduled batch processing job. Consider optimizing the batch queries or increasing the connection pool size during batch windows.":
      "检测到数据库连接超时模式，每4小时发生一次，与计划的批处理作业相关。考虑在批处理窗口期间优化批量查询或增加连接池大小。",
    "Authentication failure rate spiked by 400% in the last hour from IP range 203.0.113.0/24. This could indicate a brute-force attack. Recommend enabling rate limiting and investigating the source.":
      "过去一小时内，来自IP范围203.0.113.0/24的认证失败率飙升400%。这可能表明暴力破解攻击。建议启用速率限制并调查来源。",
    "Analysis shows 60% of API gateway requests are cache misses for frequently accessed resources. Implementing a Redis cache layer could reduce response times by an estimated 40%.":
      "分析显示，API网关请求中60%是频繁访问资源的缓存未命中。实施Redis缓存层可将响应时间降低约40%。",
    "Memory usage in user-service shows a steady 2% increase per hour without corresponding load increase. This suggests a memory leak, likely in the session management module.":
      "user-service中的内存使用量在没有相应负载增加的情况下，每小时稳定增加2%。这表明存在内存泄漏，可能在会话管理模块中。",
    "Payment service consistently hits 80% CPU during peak hours (14:00-18:00 UTC). Configuring auto-scaling with a threshold of 70% would improve reliability.":
      "支付服务在高峰时段（14:00-18:00 UTC）持续达到80% CPU。将自动扩展阈值配置为70%将提高可靠性。",
  },
};

/**
 * Look up a pre-translated string for mock content.
 * Returns undefined if no pre-translation exists (falls back to SDK).
 */
export function getMockTranslation(text: string, locale: string): string | undefined {
  return MOCK_TRANSLATIONS[locale]?.[text];
}