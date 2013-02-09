<?php
/**
 * (C) MoPad
 */
namespace MoPad\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;
use MoPad\AdminBundle\Entity\Game;

/**
 * The DefaultController provide the actions.
 * 
 * @author Janina Trost <janina.trost@student.htw-berlin.de>
 * @package MoPad\AdminBundle\Controller
 */
class DefaultController extends Controller
{
    /**
	 * action for index route
	 *
     * @Route("/}", name="_mopad")
     * @Template()
     */
    public function indexAction()
    {
        return array();
    }
	
	/**
     * action for create route
	 * 
	 * @Route("/create", name="_mopad_create")
     * @Template()
	 * 
	 * @deprecated No longer used by internal code
     */
	public function createAction()
	{
	    $game = new Game();
	    $game->setName('Move the Box');
	    $game->setDescription('Game Description');
		$game->setApiKey('apikeyGame1');
		$game->setVendor('GameVendor');
    	$game->setActivated(false);
		$game->setMinPlayer(1);
		$game->setMaxPlayer(2);
    	$game->setAcceptedGamePads('JoyPad');
	
	    $em = $this->getDoctrine()->getManager();
		// TODO Nina: create deactivated
	    //$em->persist($game);
	    //$em->flush();
	
	    return new Response('Created product id '.$game->toString());
	}
	
	/**
     * action for show route
	 * 
	 * @Route("/show", name="_mopad_show")
     * @Template()
	 * @param integer id
	 * @deprecated No longer used by internal code
     */
	public function showAction($id)
	{
	    $game = $this->getDoctrine()
	        ->getRepository('MoPadAdminBundle:Game')
	        ->find($id);
	
	    if (!$game) {
	        throw $this->createNotFoundException('No game found for id '.$id);
	    }
		
	    return new Response('game: '.$game->toString());
	}
}
