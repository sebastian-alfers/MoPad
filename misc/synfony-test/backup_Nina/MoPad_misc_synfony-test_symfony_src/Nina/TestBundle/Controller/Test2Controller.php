<?php

namespace Nina\TestBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;

// these import the "@Route" and "@Template" annotations
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use Nina\TestBundle\Controller\Test2Controller;

class Test2Controller extends Controller
{
	/** verschieden template fuer verschiedene dateiformate
	 * @Route("/hello/{name}.{_format}", defaults={"_format"="xml"}, requirements={"_format"="html|xml"}, name="_test2_hello")
	 * @Template()
	 */
	public function helloAction($name)
	{
	    return array('name' => $name);
	}
	
	
	/** 
	 * @Route("/redirect", name="_test2_redirect")
	 * @Template()
	 */
	public function redirectAction()
	{
		return $this->redirect($this->generateUrl('_test2_hello', array('name' => 'Lucas')));
	}
	
	/** 
	 * @Route("/forwardPage", name="_test2_forwardPage")
	 * @Template()
	 */
	public function forwardPageAction()
	{
		return $this->forward('NinaTestBundle:Test:fancy', array('name' => 'forward to fancy', 'color' => 'green'));
	}
	
	/** 
	 * @Route("/request", name="_test2_request")
	 * @Template()
	 */
	public function requestAction()
	{
		$name = " ";
		$request = $this->getRequest();
		$name .= "isXmlHttpRequest: ".$request->isXmlHttpRequest(); // is it an Ajax request?
		$name .= ", getPreferredLanguage: ".$request->getPreferredLanguage(array('en', 'fr'));
		$name .= ", query->get('page'): ".$request->query->get('page'); // get a $_GET parameter
		$name .= ", request->get('page'): ".$request->request->get('page'); // get a $_POST parameter
		
		return $this->redirect($this->generateUrl('_test2_hello', array('name' => $name, '_format' => 'html')));
	}
	
	/** 
	 * @Route("/session", name="_test2_session")
	 * @Template()
	 */
	public function sessionAction()
	{
		$name = " ";
		$session = $this->getRequest()->getSession();

		// store an attribute for reuse during a later user request
		$session->set('foo', 'bar');
		
		// in another controller for another request
		$name .= " foo: ". $session->get('foo');
		
		// use a default value if the key doesn't exist
		$name .= ", filters: ".$session->set('filters', array());
		
		// store a message for the very next request (in a controller)
		$session->getFlashBag()->add('notice', 'Congratulations, your action succeeded!');
		
		// display any messages back in the next request (in a template)
		
		return $this->redirect($this->generateUrl('_test2_hello', array('name' => $name, '_format' => 'html')));
	}
}
	