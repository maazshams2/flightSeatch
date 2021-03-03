flag=$1

case "$flag" in
  -r | -runner)
    echo "Opening Test Runner"
    npx cypress open
    ;;
  -hc | -headless_chrome)
    echo "Setting test execution on headless chrome"
    npx cypress run --browser chrome --headless
    ;;
  -sf | -search_flight)
    echo "Search Flight test suite"
    npx cypress run --spec cypress/integration/e2e/searchFlight/**/* --browser chrome --headed
    ;;
  -so | -sorting)
    echo "Sorting test suite"
    npx cypress run --spec cypress/integration/e2e/sorting/**/* --browser chrome --headed
    ;;
  -odf | -only_direct_flights)
    echo "Only Direct Flights test suite"
    npx cypress run --spec cypress/integration/e2e/onlyDirectFlights/**/* --browser chrome --headed
    ;;
  -cot | -cost_of_travel)
    echo "Cost of Travel test suite"
    npx cypress run --spec cypress/integration/e2e/costOfTravel/**/* --browser chrome --headed
    ;;
  *)
    echo "invalid flag"
    exit
    ;;
esac