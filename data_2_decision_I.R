## Author: Davide Weiss (davidelu.wss@gmail.com), Team Data2Decision

###################################################

### Appbeschreibung:

# Die App zeigt verschiedene KPIs im Bereich Infektionen (neue Fälle, Patentientenliste, Status, ..) und Test (auch da KPI + zeitlicher Verlauf).
# Die App sollte dafür dienen, wichtige, aktualisierte und einheitlich dargestellte Informationen im Überblick zu haben, damit Entscheidungsträger 
# (Bürgermeister, Landräter oder sogar Ministerpräsidenten) schneller agieren können.
# Im Moment beeinhält die App fiktive Daten (meistens Samples aus Normalverteilungen), die ausgebaute Pipeline ist aber bereit ausgelegt, um reale Daten anzeigen zu können.
# Dafür sollte im besten Fall auch den Back-End Prozess angepasst werden, um die Datensätze automatisch zu aktualisieren (und um dann die neuesten Daten darstellen zu können)

### Appaufbau:

# Die App besteht aus:
# - Sidebar (mit möglicher Inputeingabe)
# - Body (Hauptteil mit Darstellungen)

# Sidebar und Body (mit Start) bilden dann das User Interface. Im Hintergrund läuft das Server. 


################ Benötigte Libraries, sollten importiert werden, falls nicht vorhander ###############################


if(!require(DT)){
    install.packages("DT",repos = "http://cran.us.r-project.org")
    library(DT)
}
if(!require(shiny)){
    install.packages("shiny",repos = "http://cran.us.r-project.org")
    library(shiny)
}

if(!require(shinydashboard)){
    install.packages("shinydashboard",repos = "http://cran.us.r-project.org")
    library(shinydashboard)
}

if(!require(dygraphs)){
    install.packages("dygraphs",repos = "http://cran.us.r-project.org")
    library(dygraphs)
}

if(!require(tidyverse)){
    install.packages("tidyverse",repos = "http://cran.us.r-project.org")
    library(tidyverse)
}

if(!require(lubridate)){
    install.packages("lubridate",repos = "http://cran.us.r-project.org")
    library(lubridate)
}

if(!require(xts)){
    install.packages("xts",repos = "http://cran.us.r-project.org")
    library(xts)
}

if(!require(RColorBrewer)){
    install.packages("RColorBrewer",repos = "http://cran.us.r-project.org")
    library(RColorBrewer)
}

if(!require(plotly)){
    install.packages("plotly",repos = "http://cran.us.r-project.org")
    library(plotly)
}

if(!require(dplyr)){
    install.packages("dplyr",repos = "http://cran.us.r-project.org")
    library(dplyr)
}

if(!require(stringr)){
    install.packages("stringr",repos = "http://cran.us.r-project.org")
    library(stringr)
}

if(!require(shinyjs)){
    install.packages("shinyjs",repos = "http://cran.us.r-project.org")
    library(shinyjs)
}


#######################################################################################
# Inputmöglichkeiten & fitkive Datensätze
######################################################################################

# Auswahl bei Filterung

bundesland <- c("Bayern","Baden-Württemberg","Berlin","Brandenburg","Bremen","Hamburg","Hessen","Mecklenburg-Vorpommern","Niedersachsen","Nordrhein-Westfalen","Rheinland-Pfalz","Saarland","Sachsen","Sachsen-Anhalt","Schleswig-Holstein","Thüringen")
timeline <- seq.Date(from = as.Date("2020-03-01"), to=as.Date("2020-03-21"), by="day")

## Fiktive Verteilung für Piechart/Patientenstatus (bei realen Daten, hier ersetzen!)

haus <- round(rnorm(length(timeline)*length(bundesland), mean=75, sd=2),2)
statio <- round(rnorm(length(timeline)*length(bundesland), mean=15, sd=1),2)
intensiv <- round(rnorm(length(timeline)*length(bundesland), mean=10, sd=1),2)

infizierten_status <- data.frame(DATUM=rep(timeline,each=length(bundesland)),BUNDESLAND=rep(bundesland,length(timeline)),HAUS=haus,STATIONÄR=statio,ICU=intensiv)

infizierten_status$TOT <- rowSums(infizierten_status[,c("HAUS","STATIONÄR","ICU")])

infizierten_status[,c("HAUS","STATIONÄR","ICU")] <- (infizierten_status[,c("HAUS","STATIONÄR","ICU")]/infizierten_status$TOT)*100

#######################################

#Fiktive Daten für Verteilung mit Altersklassen (bei realen Daten, hier Datensatz ersetzen!)

#######################################


age_0_9 <- round(rnorm(length(timeline)*length(bundesland), mean=1, sd=0.2),2)
age_10_19 <- round(rnorm(length(timeline)*length(bundesland), mean=5, sd=1),2)
age_20_29 <- round(rnorm(length(timeline)*length(bundesland), mean=20, sd=2),2)
age_30_39 <- round(rnorm(length(timeline)*length(bundesland), mean=10, sd=2),2)
age_40_49 <- round(rnorm(length(timeline)*length(bundesland), mean=10, sd=1),2)
age_50_59 <- round(rnorm(length(timeline)*length(bundesland), mean=15, sd=3),2)
age_60_69 <- round(rnorm(length(timeline)*length(bundesland), mean=10, sd=3),2)
age_70_79 <- round(rnorm(length(timeline)*length(bundesland), mean=15, sd=2),2)
age_80_89 <- round(rnorm(length(timeline)*length(bundesland), mean=12, sd=2),2)
age_90_100 <- round(rnorm(length(timeline)*length(bundesland), mean=5, sd=1),2)

alter_status <- data.frame(DATUM=rep(timeline,each=length(bundesland)),BUNDESLAND=rep(bundesland,length(timeline)), AGE_0_9 = age_0_9, AGE_10_19 = age_10_19, AGE_20_29 = age_20_29, AGE_30_39 = age_30_39, AGE_40_49 = age_40_49, AGE_50_59 = age_50_59, AGE_60_69 = age_60_69, AGE_70_79=age_70_79, AGE_80_89 = age_80_89, AGE_90_100 = age_90_100)


alter_status$TOT <- rowSums(alter_status[,c(3:12)])

alter_status[,c(3:12)] <- (alter_status[,c(3:12)] / alter_status$TOT)*100


##########################################################################################

# Fiktiven Datensatz für aktuelle Patienten (falls reale Daten geben sollten, hier ersetzen!)

#########################################################################################

krankenhaus_id <- 1000:1050
patienten_id <- 100000:200000
sex <- c("M","F")
alter <- 10:90
status <- c("HAUS","STATIONÄR","ICU")

patientien_df <- data.frame(ID_PATIENT=sample(patienten_id,3000,replace = FALSE), MELDEDATUM = sample(timeline, 3000, replace=TRUE),GESCHLECHT=sample(sex,3000,replace = TRUE),ALTER=sample(alter,3000,replace=TRUE),STATUS=sample(status,3000,replace = TRUE, prob = c(0.75,0.15,0.1)))

header <-  dashboardHeader(title="")

###########################################################################################

#Testverläufe werden durch Random Walks simuliert

###########################################################################################

negative_test <-  arima.sim(model= list(order = c(0, 1, 0)), n=length(timeline), mean=800,sd=600)
positive_test <- arima.sim(model= list(order = c(0, 1, 0)), n=length(timeline), mean=500,sd=400)
ratio <- negative_test/(negative_test+positive_test)*100

basis <- data.frame(BUNDESLAND=bundesland, BASIS=sample(30000:60000,size = length(bundesland)))



###########################################################################################



# Sidebar (linke Dashboardsseite, wo Input eingegeben werden kann)

sidebar <- dashboardSidebar(tags$style(".irs-bar,
                                       .irs-bar-edge,
                                       .irs-single,
                                       .irs-grid-pol {
                                       background: #d17f06;
                                       border-color: #d17f06;
                                       }
                                       "),
                            width =250,
                            sidebarMenu(id = "sidebar",
                                        menuItem("",tabName="start"),
                                        
                                        menuItem("Infektionen", tabName = "infektionen", icon = icon(""),         # Reiter Infektionen
                                                 
                                                 selectInput("info_bundesland",label=("Wähle ein Bundesland"),choices = bundesland),  #Bundeslandauswahl
                                                 dateRangeInput('info_date',
                                                                label = 'Zeitraum',
                                                                start = as.Date("2020-03-01"), end = as.Date("2020-03-21")    #Zeiteingabe
                                                 ),
                                                 menuItem(text = "Zu der Auswertung",tabName = "info_sub",icon=icon("arrow-circle-right"))),
                                                 
                                                 
                                                 menuItem("Tests", tabName = "test", icon = icon(""),            # Reiter Tests
                                                        
                                                          selectInput("test_bundesland",label=("Wähle ein Bundesland"),choices = bundesland),       #Bundeslandauswahl
                                                          dateRangeInput('test_date',
                                                                         label = 'Zeitraum',
                                                                         start = as.Date("2020-03-01"), end = as.Date("2020-03-21")         #Zeiteingabe
                                                          ),
                                                          menuItem(text = "Zu der Auswertung",tabName = "test_sub",icon=icon("arrow-circle-right"))
                                                          )))
                                                 
                                             



body <- dashboardBody(
    useShinyjs(),
    tags$head(tags$style(HTML('                                /* body */
                            .content-wrapper, .right-side {
                            background-color: #ffffff;
                            }
                            .shiny-output-error-validation {
                            color: black;
                            font-size: 16px;
                            }
                            .nav-tabs-custom .nav-tabs li.active {
                              border-top-color: #FFA500;'
    ))),

    tabItems(
        tabItem(tabName ="start",
                fluidRow(
                    imageOutput("intro"))),
        tabItem(
            tabName = "info_sub",              #Verknüfung zu Infektionen
            fluidRow(
                uiOutput("info_sub_I"),     #Kennzahl links
                uiOutput("info_sub_II"),    #Kennzahl Mitte
                uiOutput("info_sub_III")    #Kennzahl rechts
            ),
            fluidRow(
                uiOutput("body_info"))),    # Piechart, Histogram, Tabelle 
        
        tabItem(
            tabName = "test_sub",        # Verknüpfung zu Tests
                fluidRow(
                    fluidRow(
                        uiOutput("info_test_I"),  #Kennzahl likns
                        uiOutput("info_test_II"),   #Kennzahl Mitte
                        uiOutput("info_test_III")   #Kennzahl rechts
                    ),
                    dygraphOutput("test_graph")     #Zeitliche Testsentwicklung
                    
                )
        
                
        )
    )
)



ui <-  dashboardPage(
    title="Data2Decision",
    skin = "red",
    header = header,
    sidebar = sidebar,
    body = body
)

server <- function(input,output) {  
    
    output$intro <- renderImage({
        filename <- normalizePath("C:/Users/DE107698/Desktop/lol.jpg")
        list(src=filename,width="100%")},deleteFile = FALSE)
    
    
    ###############################
    
 
    ##############################
    
    output$info_sub_I <- renderUI({
        valueBox(round(rnorm(1,mean=1000, sd=300),0),subtitle = "Neuinfizierte (24h)",width = 4,color = "red", icon= icon("dizzy"))     #Infektionen, Kennzahl links (gern mit realen Daten ersetzen)
        
    })
    
    
    output$info_sub_II <- renderUI({
        valueBox(round(rnorm(1,mean = 20.8,sd=2.34),2),subtitle = "Neuinfizierte (% zum Vortag)",width = 4,icon = icon("chart-line"), color = "yellow") #Infektionen, Kennzahl mitte (gern mit realen Daten ersetzen)
        
    })
    
    
    output$info_sub_III <- renderUI({
        valueBox(round(rnorm(45,mean = 87, sd=20),0),subtitle = "Genesene (24h)",width = 4,icon = icon("smile-beam"),color = "green") #Infektionen, Kennzahl rechts (gern mit realen Daten ersetzen)
        
    })
    
    
    
    
    output$body_info <- renderUI({
        tabBox(title="",width=12,
               tabPanel(tagList("",icon("area-chart")), 
                        column(6,plotlyOutput("pie_chart",width = "100%"),offset = 0,style="padding:0px 0px;",align="left"),  # Pie-Chart mit Status
                        column(6,plotlyOutput("bar_chart",width = "100%"),offset = 0,style="padding:0px 0px;")  #Barchart mit Altersverteilung
               )
               ,
               tabPanel(tagList("",icon("table")),
                        uiOutput("info_beschreibung"),              #Text mit Beschreibung 
                        dataTableOutput("patienten_tabelle",width = "100%",height = "auto"))) #Tabelle mit Patienten
    })
    
    
    output$pie_chart <- renderPlotly({   # Pie-Chart mit Status (hier reale Daten verknüpfen)

        pie_I <- infizierten_status[infizierten_status$DATUM==max(infizierten_status$DATUM) & infizierten_status$BUNDESLAND==input$info_bundesland,]
        pie_I <- pie_I[,c("HAUS","STATIONÄR","ICU")]
        pie_I <- as.data.frame(t(pie_I))
        colnames(pie_I) <- "PCT"
        
        pie_III <- plot_ly(pie_I, labels = row.names(pie_I), values = pie_I$PCT, type = 'pie',  insidetextfont = list(color = 'white'), outsidetextfont=list(color="black")) %>%
            layout(title = paste0("Situation am ",max(infizierten_status$DATUM),"\n\n\n"),
                   xaxis = list(showgrid = FALSE, zeroline = FALSE, showticklabels = FALSE),
                   yaxis = list(showgrid = FALSE, zeroline = FALSE, showticklabels = FALSE))#,
        #legend = list(x = 0.86, y = 0.5))
        
        
        pie_III
        
        
    })
    
    
    output$bar_chart <- renderPlotly({   #Barchart mit Altersverteilung (hier reale Daten verknüpfen)
        
        bar_I <- alter_status[alter_status$DATUM==max(alter_status$DATUM) & alter_status$BUNDESLAND==input$info_bundesland,]
        bar_I <- bar_I[,c(3:12)]
        bar_I <- as.data.frame(t(bar_I))
        colnames(bar_I) <- "PCT"
        
        bar_III <- plot_ly(bar_I, y = bar_I$PCT, x = as.character(row.names(bar_I)), type = 'bar') %>%
            layout(title = paste0("Situation am ",max(infizierten_status$DATUM),"\n\n\n"),yaxis=list(type='linear'))

        #legend = list(x = 0.86, y = 0.5))
        
        
        bar_III
        
        
    })
    
    
    output$info_beschreibung <- renderUI({ #ein einfacher HTML-Text, sollte als Hilfe dienen
        
        HTML("<h5> <b> Anbei befindet sich die Liste mit den letzten Infizierungen.
         <br>
         <br>")
    })
    
    
    output$patienten_tabelle <- renderDataTable({
        
     
        datatable(patientien_df)
    })
    
    
    
    
    ##############################
    
    
    output$info_test_I <- renderUI({         #Tests, Kennzahl links (mit realen Daten ersetzen!)
        
        valueBox(round(rnorm(1,mean=14500, sd=300),0),subtitle = "Durcheführte Tests (24h)",width = 4,color = "light-blue", icon= icon("vial"))
        
    })
    
    output$info_test_II<- renderUI({        #Tests, Kennzahl mitte (mit realen Daten ersetzen!)
        
        valueBox(round(rnorm(1,mean=11000, sd=100),0),subtitle = "Ausgewertete Tests (24h)",width = 4,color = "green", icon= icon("check-circle"))
    })
    
    output$info_test_III <- renderUI({      #Tests, Kennzahl rechts (mit realen Daten ersetzen!)
        
        valueBox(round(rnorm(1,mean=3000, sd=400),0),subtitle = "Warteschlange (kumuliert)",width = 4,color = "orange", icon= icon("clock"))
    })
    
    
    
    
    output$test_graph <- renderDygraph({       #Testverläufe (gern mit realen Zahlen ersetzen)
        
               basis <- basis[basis$BUNDESLAND==input$test_bundesland,]                     #Filterung nach Bundesland
               basis_positiv <- basis$BASIS[1] + positive_test[2:length(positive_test)]
              
               ratio_int <- ratio[2:length(ratio)]/100
               
              II <- data.frame(POSITIV=basis_positiv*(1-ratio_int),NEGATIV=basis_positiv*ratio_int)
              II_xts <- xts(II, order.by = timeline)
              
              dygraph(II_xts, main= paste("Testentwicklungen in ",input$test_bundesland)) %>%
                  dySeries("POSITIV", label = "POSITIV",color = "red") %>%
                  dySeries("NEGATIV", label = "NEGATIV",color = "green") %>%
                  dyOptions(stackedGraph = TRUE, fillAlpha = 0.7) %>%
                  dyRangeSelector(dateWindow = input$test_date)        #Fillterung nach Zeiteingabe
  
            


        
    })
}
    

shinyApp(ui = ui, server = server) 
