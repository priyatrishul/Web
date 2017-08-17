use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $sid = $q->cookie("jadrn043SID") || undef;
$session = new CGI::Session(undef, $sid, {Directory => '/tmp'});
$session->delete();
my $cookie = $q->cookie(jadrn043SID => '');
print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser  


print <<END;    
    
<html>
<head>
    
</head>
<body>
<h2>You are now logged out<h2>
<a href="http://jadran.sdsu.edu/~jadrn043/proj1/login/login.html">Click here to login</a>
</body>
</html>

END
