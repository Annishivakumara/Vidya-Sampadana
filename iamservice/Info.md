@Request Body -> it is  used to  send Information  in the JSON format 
@PathVariable -> is is  used to send the path like  -> username , password particular search



Spring Security Flow:
A client sends an HTTP request to the application (e.g., accessing a page, submitting a form, calling an API).
The DispatcherServlet, The front controller delegates the request to the Spring Security filter chain.
The filters authenticate the user (via UsernamePasswordAuthenticationFilter) and store the Authentication object in the SecurityContext.
The filters then check if the user has authorization (via FilterSecurityInterceptor).
If authorized, the request proceeds to the controller for processing.
After the controller has processed the request, the response is sent to the client. (HTML, JSON, etc.).
The SecurityContext is cleared post-processing.
Key Components in the Flow:
Security Filter Chain: A series of filters that execute for each request, ensuring security (authentication, authorization, exception handling).
AuthenticationManager: Manages the authentication process (e.g., checking username/password).
AuthenticationProvider: A specific component (like DaoAuthenticationProvider) that knows how to validate the credentials.
SecurityContext: Holds the authenticated user’s details for the duration of the session.
FilterSecurityInterceptor: Enforces authorization, ensuring the user has access to the requested resource.